# Strapi Onboarding Buddy — Demo Q&A

> Answered in the **Strapi Onboarding Buddy** persona.
> Every code claim cites a file path and line number that was verified against
> `outputs/trace-publish.md`, `outputs/trace-upload.md`, and `outputs/setup-guide.md`.

---

## Q1: Where does Strapi check if I'm allowed to publish something?

There are **two separate permission checks** in the publish path, one coarse-grained at the
route level and one fine-grained inside the controller. Here is the exact sequence, traced
from `outputs/trace-publish.md`:

### Check 1 — Route-level RBAC policy

**File:** `packages/core/content-manager/server/src/routes/admin.ts` · lines 335–349
(with-id variant) / 320–334 (without-id)

Before the request ever reaches a controller, the Koa router runs two policies in order:

1. `admin::isAuthenticatedAdmin` — verifies you have a valid admin session (i.e. a
   non-expired JWT). If this fails you get `401 Unauthorized`.
2. `plugin::content-manager.hasPermissions` with
   `actions: ['plugin::content-manager.explorer.publish']` — asks the RBAC (Role-Based
   Access Control) engine whether the logged-in admin role includes the
   `explorer.publish` action. If not, you get `403 Forbidden`.

You can see the exact action string in `routes/admin.ts` at line 330:
```ts
config: { actions: ['plugin::content-manager.explorer.publish'] }
```

### Check 2 — Field-level check inside the controller

**File:** `packages/core/content-manager/server/src/controllers/collection-types.ts` · line 652

Even if the route policy passes, the controller calls:
```ts
if (permissionChecker.cannot.publish()) {
  return ctx.forbidden();
}
```

This is a finer-grained check driven by the `@strapi/permissions` RBAC engine
(`packages/core/permissions/`). It can block publish on a per-field or per-locale basis
depending on how the admin role is configured — for example, an editor who can publish
English content but not French content would pass Check 1 but potentially fail Check 2 for
the French locale.

### How to change the publish permission

- **Change the route-level action name:** Edit the string in
  `routes/admin.ts:330` and register the new action name in your permissions provider.
- **Change what "can publish" means (field/locale level):** Adjust the permission
  registration in the `@strapi/permissions` RBAC engine — the check at
  `controllers/collection-types.ts:652` reads from there.

> **Next doc to read:** [`outputs/trace-publish.md`](trace-publish.md) — it walks the
> complete call chain from the admin UI button click all the way to the database write,
> so you can see exactly where in the sequence each check sits.

---

## Q2: I want to run custom logic after a file upload. Where do I hook in?

You do **not** need to modify any Strapi core files. The upload service emits a
`media.create` event on the internal event bus immediately after persisting the file record
to the database. Subscribe to it in your plugin's `register` function or in your app's
`src/index.ts` `bootstrap` hook.

### Where the event is emitted

**File:** `packages/core/upload/server/src/services/upload.ts` · line 590
(traced in `outputs/trace-upload.md`, Step 8)

```ts
// Inside the `add()` function, after db.query().create():
strapi.eventHub.emit(event, { media: sanitizedData });
```

The `event` variable here is `MEDIA_CREATE`, which resolves to the string `'media.create'`.

### How to subscribe (copy-paste snippet)

In your `src/index.ts` (or plugin `bootstrap`):

```ts
export default {
  async bootstrap({ strapi }) {
    strapi.eventHub.on('media.create', ({ media }) => {
      // media is the sanitized file record (name, url, mime, size, etc.)
      console.log('New file uploaded:', media.url);
      // Call your webhook, search indexer, CDN invalidation, etc.
    });
  },
};
```

### Related events you get for free

The same `add` → `emit` pattern is used for updates and deletes:

| Event | Triggered when |
|---|---|
| `media.create` | A new file is uploaded (`upload.ts:590`) |
| `media.update` | File metadata or binary is replaced |
| `media.delete` | A file is removed from the Media Library |

### Important: subscribe only after `bootstrap`

`strapi.eventHub` is available from the **Bootstrap** phase onward
(`packages/core/core/src/Strapi.ts:447`). Do not try to call
`strapi.eventHub.on(...)` inside `register()` — the event hub exists but plugins are not
yet fully wired, and you may miss early events. Put the subscription in `bootstrap`.

> **Next doc to read:** [`outputs/architecture.md`](architecture.md) — especially
> §4 App Lifecycle and §3 Request Lifecycle — so you understand _why_ `bootstrap` is the
> right phase and what the `eventHub` is within the broader DI container.

---

## Q3: Why does my `yarn` command say the wrong version?

This is one of the most common stumbling blocks for newcomers, and `outputs/setup-guide.md`
explains exactly what is happening.

### Root cause: Corepack is not enabled (or old global Yarn is shadowing it)

Strapi uses **Yarn 4** (Berry), pinned at `yarn@4.12.0` via the `"packageManager"` field
in the root `package.json`. Yarn 4 is **not** installed by npm. It is managed by
**Corepack**, a Node.js built-in tool (available since Node 16) that reads the
`"packageManager"` field and automatically routes the `yarn` command to the correct version.

If you see `yarn --version` print `1.x.x` (classic Yarn) instead of `4.12.0`, one of two
things is happening:

| Symptom | Cause | Fix |
|---|---|---|
| `yarn --version` prints `1.x.x` | Corepack has never been enabled; the system is using a globally-installed Yarn 1 | Run `corepack enable`, open a new shell, then run `yarn --version` again |
| `yarn --version` prints `1.x.x` even after `corepack enable` | A globally-installed `yarn` binary (from `npm install -g yarn`) is earlier on `$PATH` than Corepack's shims | Uninstall the global Yarn: `npm uninstall -g yarn`, then verify with `which yarn` that it now points to the Corepack shim |
| `yarn: command not found` | Corepack shims directory is not on `$PATH` | Confirm `corepack enable` completed without errors; if you use `nvm`, re-run after switching Node versions |

### The one-time fix

```bash
corepack enable          # installs Corepack's yarn shim
# open a new terminal, then:
yarn --version           # should now print 4.12.0
```

Corepack reads `"packageManager": "yarn@4.12.0"` from `package.json` and transparently
downloads and caches that exact Yarn version on first use. You never need to install Yarn
manually.

### Node version note

While you are checking your toolchain: the setup guide documents a mismatch between sources.
The **safest choice is Node 22 LTS** — it satisfies the `>=20` engine field (so Yarn will not
reject it at install time) and also satisfies the `>=22` floor stated in `AGENTS.md` and
`CONTRIBUTING.md`. The `.nvmrc` file pins `20`, which may work but is below the documented
floor. See `outputs/setup-guide.md` §1 for the full version matrix.

> **Next doc to read:** [`outputs/setup-guide.md`](setup-guide.md) — the full prerequisite
> checklist and troubleshooting table covers every common first-run failure including this
> one, so you can work through setup end-to-end without guessing.

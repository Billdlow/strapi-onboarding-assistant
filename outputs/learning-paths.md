# Strapi Monorepo — Learning Paths for New Contributors

> Three structured paths built entirely from the docs in `outputs/`. Each plan tells you
> **what to read, in what order, which trace to walk through, and which starter task to
> attempt.** Estimated reading times assume ~200 words/minute.

---

## How to use this document

1. Pick the path that matches why you are here.
2. Follow the Day 1 → Day 2 → Day 3 sequence — later days assume earlier ones are done.
3. Each step lists the doc, the sections to focus on, and the reading-time estimate.
4. On Day 3 you attempt a real starter task from [`outputs/starter-tasks.md`](./starter-tasks.md).

---

## Path A — Backend Contributor

> **Goal:** Understand the server-side request pipeline, the DI container, the app lifecycle,
> and the Document Service well enough to fix a bug or add a small backend feature.

### Day 1 — Architecture and environment (~2 h total)

| Order | Document & section                                                                  | Focus                                                                             | Est. time |
| ----- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------- |
| 1     | [`architecture.md`](./architecture.md) — §1 Strapi in One Paragraph                 | Monorepo shape, what the `Strapi` class is, which branch to target                | 3 min     |
| 2     | [`architecture.md`](./architecture.md) — §2 Package Map                             | Which package lives where; understand `@strapi/core` vs `@strapi/strapi`          | 5 min     |
| 3     | [`architecture.md`](./architecture.md) — §3 Request Lifecycle + flowchart           | The Routes → Policies → Controller → Service → Document Service → DB chain        | 7 min     |
| 4     | [`architecture.md`](./architecture.md) — §4 App Lifecycle                           | Register / Bootstrap / Start / Destroy order; `isLoaded` flag                     | 5 min     |
| 5     | [`architecture.md`](./architecture.md) — §6 Five Things New Contributors Get Wrong  | Entity Service deprecation, DI, branch discipline, CE/EE split, `isLoaded` timing | 8 min     |
| 6     | [`setup-guide.md`](./setup-guide.md) — §1 Prerequisites + §2 Step-by-step first run | Install Node 22, Corepack, Yarn 4; clone; `yarn setup`                            | 10 min    |
| 7     | [`setup-guide.md`](./setup-guide.md) — §4 Which test do I run?                      | Know the right `yarn test:*` command before touching any code                     | 5 min     |

**Day 1 goal:** environment is working (`node --version` = 22.x, `yarn --version` = 4.12.0,
`yarn develop` in `examples/getstarted` starts without errors).

---

### Day 2 — Trace the publish flow (~1.5 h total)

| Order | Document & section                                                                            | Focus                                                                    | Est. time |
| ----- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------- |
| 1     | [`feature-index.md`](./feature-index.md) — Feature Table row 2 (Publish)                      | Get a one-paragraph preview before reading the full trace                | 3 min     |
| 2     | [`trace-publish.md`](./trace-publish.md) — Steps 1–3 (route → RBAC → controller)              | How permission is checked at route level AND inside the controller       | 10 min    |
| 3     | [`trace-publish.md`](./trace-publish.md) — Steps 4–6 (DocumentManager → repository → entries) | The draft/publish row duality, `strapi.db.transaction`, relation re-sync | 15 min    |
| 4     | [`trace-publish.md`](./trace-publish.md) — Mermaid diagram                                    | Read the sequence diagram while your trace notes are fresh               | 5 min     |
| 5     | [`trace-publish.md`](./trace-publish.md) — "Where Would I Change X?"                          | Learn the three change-points without modifying any code                 | 5 min     |
| 6     | [`feature-index.md`](./feature-index.md) — Concepts Glossary                                  | Nail down Document Service, `eventHub`, `strapi.db.transaction`          | 5 min     |
| 7     | [`trace-login.md`](./trace-login.md) — Steps 1–4                                              | See a second request lifecycle: rate-limit → Yup validation → bcrypt     | 10 min    |

**Day 2 goal:** able to answer "what two permission checks happen before a document is published,
and which files contain them?" without opening any source file.

---

### Day 3 — First real task

| Step | Action                                                                                                                             | Time budget |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1    | Read [`starter-tasks.md`](./starter-tasks.md) Task 2 brief completely                                                              | 5 min       |
| 2    | Re-read [`architecture.md`](./architecture.md) §6 Pitfall 2 (Entity Service deprecation)                                           | 3 min       |
| 3    | Open `packages/core/content-manager/server/src/controllers/__tests__/relations.test.ts` and read the skipped `describe.skip` block | 10 min      |
| 4    | Implement: remove `describe.skip`, port test mocks from Entity Service to Document Service                                         | 1–2 h       |
| 5    | Verify with `yarn nx test @strapi/content-manager`                                                                                 | —           |
| 6    | Check [`setup-guide.md`](./setup-guide.md) §6 Pre-PR checklist before opening a PR                                                 | 5 min       |

**Recommended starter task:** [Task 2 — Un-skip the `relations` controller test suite](./starter-tasks.md)

---

## Path B — Admin / Frontend Contributor

> **Goal:** Understand the server/admin split, the React admin package, how UI components
> talk to the backend, and how to run and write frontend tests.

### Day 1 — Architecture and environment (~1.5 h total)

| Order | Document & section                                                                  | Focus                                                                                 | Est. time |
| ----- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------- |
| 1     | [`architecture.md`](./architecture.md) — §1 Strapi in One Paragraph                 | Monorepo layout; React 18, Vite, Redux admin stack                                    | 3 min     |
| 2     | [`architecture.md`](./architecture.md) — §5 Server vs Admin Split                   | `strapi-server` vs `strapi-admin` entry points; why `@strapi/content-manager` has two | 6 min     |
| 3     | [`architecture.md`](./architecture.md) — §2 Package Map                             | `@strapi/admin` package; where the React code lives                                   | 4 min     |
| 4     | [`architecture.md`](./architecture.md) — §4 App Lifecycle                           | Know when Register vs Bootstrap runs so you understand when admin is available        | 5 min     |
| 5     | [`setup-guide.md`](./setup-guide.md) — §1 Prerequisites + §2 Step-by-step first run | Same setup steps; note that `yarn test:front` is your primary test command            | 10 min    |
| 6     | [`setup-guide.md`](./setup-guide.md) — §4 Which test do I run? (Admin UI row)       | `yarn test:front` vs `yarn test:front:ce`; EE flag                                    | 4 min     |
| 7     | [`setup-guide.md`](./setup-guide.md) — §5 Troubleshooting (Playwright row)          | E2E setup: `yarn playwright install`                                                  | 2 min     |

**Day 1 goal:** `yarn test:front:ce` runs and exits green on your machine.

---

### Day 2 — Trace a UI-initiated action (~1.5 h total)

| Order | Document & section                                                                                | Focus                                                                                 | Est. time |
| ----- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------- |
| 1     | [`trace-publish.md`](./trace-publish.md) — Step 1 (Admin UI `publishDocument` mutation)           | RTK-Query mutation, cache tag invalidation, how the UI fires the request              | 8 min     |
| 2     | [`trace-publish.md`](./trace-publish.md) — Mermaid diagram                                        | Read from the "Admin UI" swimlane downward                                            | 5 min     |
| 3     | [`trace-create-content-type.md`](./trace-create-content-type.md) — Steps 1–2 (route + controller) | `isDevelopmentMode` guard; why CTB is dev-only                                        | 6 min     |
| 4     | [`trace-create-content-type.md`](./trace-create-content-type.md) — Step 2a (Yup validation)       | How the server validates incoming schema shapes                                       | 4 min     |
| 5     | [`trace-upload.md`](./trace-upload.md) — Steps 1–3 (route → controller → PermissionsManager)      | How RBAC is done inside a controller via `PermissionsManager`; AI metadata hook       | 10 min    |
| 6     | [`feature-index.md`](./feature-index.md) — Quick-reference Change-point Map                       | Which frontend concerns (RBAC action, content-type reserved names) live in the server | 4 min     |
| 7     | [`buddy-demo.md`](./buddy-demo.md) — Q1 (permission checks)                                       | Reinforces where to look when a UI action returns 403                                 | 5 min     |

**Day 2 goal:** able to explain which React hook fires when a user clicks Publish, and where
the corresponding server-side permission check is.

---

### Day 3 — First real task

| Step | Action                                                                                                       | Time budget |
| ---- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| 1    | Read [`starter-tasks.md`](./starter-tasks.md) Task 1 brief (JSDoc + typo fix)                                | 5 min       |
| 2    | Read [`architecture.md`](./architecture.md) §3 Request Lifecycle (pagination context)                        | 5 min       |
| 3    | Open `packages/core/utils/src/pagination.ts` at lines 16 and 138; note the typo and the existing JSDoc style | 10 min      |
| 4    | Implement: rename (or alias) `PagePatinationInformation`, add JSDoc to both interfaces                       | 30–60 min   |
| 5    | Verify with `yarn nx test @strapi/utils && yarn test:ts`                                                     | —           |
| 6    | Check [`setup-guide.md`](./setup-guide.md) §6 Pre-PR checklist                                               | 5 min       |

**Recommended starter task:** [Task 1 — Add JSDoc to `PagePatinationInformation` and fix the typo](./starter-tasks.md)

---

## Path C — Plugin Developer

> **Goal:** Understand how plugins are structured, how they interact with the Document Service
> and `eventHub`, how to write a `strapi-server` entry point, and how to hook into existing
> Strapi lifecycle events without modifying core files.

### Day 1 — Architecture and plugin model (~1.5 h total)

| Order | Document & section                                                  | Focus                                                                          | Est. time |
| ----- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------- |
| 1     | [`architecture.md`](./architecture.md) — §1 Strapi in One Paragraph | DI container, packages layout, `develop` branch                                | 3 min     |
| 2     | [`architecture.md`](./architecture.md) — §2 Package Map             | `@strapi/plugin-users-permissions` as a reference plugin; `packages/plugins/`  | 5 min     |
| 3     | [`architecture.md`](./architecture.md) — §5 Server vs Admin Split   | `strapi-server` / `strapi-admin` entry points — core to how plugins are loaded | 6 min     |
| 4     | [`architecture.md`](./architecture.md) — §4 App Lifecycle           | Register vs Bootstrap; when to subscribe to `eventHub` (answer: Bootstrap)     | 5 min     |
| 5     | [`architecture.md`](./architecture.md) — §6 Pitfalls 1, 2, 5        | DI over globals; Document Service over Entity Service; `isLoaded` timing       | 7 min     |
| 6     | [`setup-guide.md`](./setup-guide.md) — §1–§2                        | Get the dev environment running                                                | 10 min    |
| 7     | [`buddy-demo.md`](./buddy-demo.md) — Q2 (post-upload hook)          | See the exact `eventHub.on` pattern for plugin-side hooks                      | 5 min     |

**Day 1 goal:** understand why plugins must subscribe to events in `bootstrap`, not `register`.

---

### Day 2 — Trace two plugin integration points (~2 h total)

| Order | Document & section                                                                                                    | Focus                                                                                  | Est. time |
| ----- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| 1     | [`trace-publish.md`](./trace-publish.md) — Steps 5–6 + "Run custom logic after publish"                               | `entry.publish` event: emitted where, consumed how, no core change needed              | 10 min    |
| 2     | [`trace-upload.md`](./trace-upload.md) — Step 8 + "Run custom logic after upload"                                     | `media.create` event: same pattern, DB write → emit → plugin subscribes                | 8 min     |
| 3     | [`trace-login.md`](./trace-login.md) — "Add a custom login check" section                                             | Where to insert plugin-level guards without forking core                               | 6 min     |
| 4     | [`trace-create-content-type.md`](./trace-create-content-type.md) — Step 3 (service) + "Run custom logic after create" | `content-type.create` event; deferred `strapi.reload()`                                | 8 min     |
| 5     | [`feature-index.md`](./feature-index.md) — Quick-reference Change-point Map                                           | Full list of eventHub events across all three features                                 | 5 min     |
| 6     | [`feature-index.md`](./feature-index.md) — Concepts Glossary                                                          | `PermissionsManager`, `SchemaHandler`, `Provider` — the three plugin-facing primitives | 5 min     |
| 7     | [`trace-upload.md`](./trace-upload.md) — "Reject a specific file type"                                                | How to use `db.lifecycles.subscribe` as an alternative to eventHub                     | 5 min     |

**Day 2 goal:** able to write the bootstrap snippet for any of the three `eventHub` events from
memory and explain why each hook location was chosen.

---

### Day 3 — First real task

| Step | Action                                                                                    | Time budget |
| ---- | ----------------------------------------------------------------------------------------- | ----------- |
| 1    | Read [`starter-tasks.md`](./starter-tasks.md) Task 3 brief (export `asyncCurry`)          | 5 min       |
| 2    | Re-read [`architecture.md`](./architecture.md) §2 Package Map (barrel-export convention)  | 4 min       |
| 3    | Open `packages/core/utils/src/validate/utils.ts:3` and `packages/core/utils/src/index.ts` | 10 min      |
| 4    | Run `grep -r "asyncCurry" packages/` to find any duplicate copies across plugins          | 5 min       |
| 5    | Implement: re-export from barrel, replace duplicates with the shared import, remove TODO  | 30–60 min   |
| 6    | Verify with `yarn test:unit && yarn test:ts`                                              | —           |
| 7    | Check [`setup-guide.md`](./setup-guide.md) §6 Pre-PR checklist                            | 5 min       |

**Recommended starter task:** [Task 3 — Export `asyncCurry` from `@strapi/utils` barrel](./starter-tasks.md)

---

## Quick-reference: path × doc matrix

| Document                                                         | Backend (Path A)    | Admin/Frontend (Path B)    | Plugin Dev (Path C)                |
| ---------------------------------------------------------------- | ------------------- | -------------------------- | ---------------------------------- |
| [`architecture.md`](./architecture.md)                           | Day 1, all sections | Day 1, §2 §4 §5            | Day 1, §2 §4 §5 §6                 |
| [`setup-guide.md`](./setup-guide.md)                             | Day 1, all sections | Day 1, all sections        | Day 1, §1–§2                       |
| [`trace-publish.md`](./trace-publish.md)                         | Day 2, full trace   | Day 2, Steps 1–2 + diagram | Day 2, Steps 5–6 + hooks           |
| [`trace-login.md`](./trace-login.md)                             | Day 2, Steps 1–4    | —                          | Day 2, "Add login check"           |
| [`trace-create-content-type.md`](./trace-create-content-type.md) | —                   | Day 2, Steps 1–2a          | Day 2, Step 3 + hook               |
| [`trace-upload.md`](./trace-upload.md)                           | —                   | Day 2, Steps 1–3           | Day 2, Steps 7–8 + hooks           |
| [`feature-index.md`](./feature-index.md)                         | Day 2, row 2        | Day 2, change-point map    | Day 2, change-point map + glossary |
| [`buddy-demo.md`](./buddy-demo.md)                               | —                   | Day 2, Q1                  | Day 1, Q2                          |
| [`starter-tasks.md`](./starter-tasks.md)                         | Day 3, Task 2       | Day 3, Task 1              | Day 3, Task 3                      |

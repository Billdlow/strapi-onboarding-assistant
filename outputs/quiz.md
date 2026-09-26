# Strapi Monorepo — New Contributor Quiz

> 10 multiple-choice questions that check whether you understood the material in `outputs/`.
> Attempt the quiz **before** looking at the answers at the bottom.
> Each question references a concept from at least one `outputs/` document.

---

## Questions

### Q1

Which of the following is the **correct, modern way** to perform content operations in Strapi?

- A) `global.strapi.entityService.findMany(...)`
- B) `strapi.documents(uid).findMany(...)`
- C) `strapi.entityService.findMany(...)`
- D) `strapi.db.entityService.findMany(...)`

---

### Q2

In what order does Strapi run its application lifecycle phases?

- A) Bootstrap → Register → Start → Destroy
- B) Start → Register → Bootstrap → Destroy
- C) Register → Bootstrap → Start → Destroy
- D) Register → Start → Bootstrap → Destroy

---

### Q3

A new PR is ready. Which branch should it **target**?

- A) `main`
- B) `master`
- C) `develop`
- D) `release`

---

### Q4

You want to subscribe to an event after a document is published. In which lifecycle phase
should you call `strapi.eventHub.on('entry.publish', ...)`?

- A) `register()` — as early as possible
- B) `bootstrap()` — after the database is initialised
- C) `start()` — once the server is listening
- D) Anywhere, because `eventHub` is always ready

---

### Q5

What are the **two separate** permission checks that happen when a user clicks **Publish** in the
Content Manager admin UI? (Choose the best answer.)

- A) An OAuth token check in the middleware, then a Yup body-validation check in the service
- B) A route-level `hasPermissions` RBAC policy (`explorer.publish`), then a field-level
  `permissionChecker.cannot.publish()` check inside the controller
- C) A JWT signature check in the route, then a bcrypt password check in the service
- D) A rate-limit check in the middleware, then a `global.strapi` DI check in the controller

---

### Q6

What is the **safest Node.js version** for a new Strapi monorepo contributor, given the
discrepancy between `.nvmrc` (pins `20`) and `AGENTS.md` / `CONTRIBUTING.md` (floor `22`)?

- A) Node 18 LTS — it is proven stable
- B) Node 20 — it matches `.nvmrc` exactly
- C) Node 22 LTS — satisfies both the `>=20` engine field and the `>=22` floor in AGENTS.md
- D) Node 24 — always use the latest LTS

---

### Q7

Which **single command** must you run **before** any API integration tests to avoid misleading
failures from a stale test application?

- A) `yarn setup`
- B) `yarn test:generate-app`
- C) `yarn build --skip-nx-cache`
- D) `yarn test:unit`

---

### Q8

A `POST /content-types` request to create a new content type returns `403 Forbidden` even
though the admin user is authenticated. What is the most likely cause?

- A) The database transaction was rolled back by `strapi.db.transaction`
- B) The `isDevelopmentMode` middleware rejected the request because the server is running
  in production mode
- C) The Yup validator rejected the request body because `singularName` was missing
- D) The `fse.writeJSON` call failed to create the parent directory

---

### Q9

In the upload pipeline, why does the provider service prefer `provider.uploadStream(file)`
over `provider.upload(file)` when both are available?

- A) `uploadStream` compresses the file before sending, saving bandwidth
- B) `uploadStream` skips the Sharp image-optimisation step, making uploads faster
- C) `uploadStream` avoids holding the entire file in memory as a buffer
- D) `uploadStream` writes directly to the database instead of using `strapi.db`

---

### Q10

Which **mandatory pre-PR command** runs unit tests, frontend tests, TypeScript checks, linting,
and formatting verification all in one go?

- A) `yarn ci`
- B) `yarn test:all`
- C) `yarn test:unit && yarn test:front && yarn test:ts && yarn lint && yarn prettier:check`
- D) `yarn test:unit && yarn test:api && yarn test:e2e`

---

---

## Answers

> Read the explanation and the doc reference for each answer — that is where the real learning is.

---

### A1 — **B** `strapi.documents(uid).findMany(...)`

**Explanation:** `strapi.entityService` is **deprecated**. The getter still exists for
backwards compatibility but `AGENTS.md` explicitly states all new content operations must use
the **Document Service** (`strapi.documents`). `global.strapi` must never be used in
application code — always accept `strapi` as a DI parameter.

**Doc reference:** [`architecture.md`](./architecture.md) — §6 Pitfall 2 "Using Entity Service
instead of Document Service"

---

### A2 — **C** Register → Bootstrap → Start → Destroy

**Explanation:** `start()` calls `load()` internally. `load()` runs `register()` first (EE
licence init, plugin route/service registration), then `bootstrap()` (DB init, schema sync,
middleware init, routing wired). Only after `load()` completes does the server begin listening
(`Start`). `Destroy` is the teardown phase.

**Doc reference:** [`architecture.md`](./architecture.md) — §4 App Lifecycle

---

### A3 — **C** `develop`

**Explanation:** `main` is the stable release branch — PRs to `main` will be rejected. All
contributions branch from `develop` and target `develop`. This is stated in both `AGENTS.md`
(referenced in `architecture.md`) and the `setup-guide.md` pre-PR checklist.

**Doc reference:** [`architecture.md`](./architecture.md) — §6 Pitfall 3 "Targeting the wrong
branch"; [`setup-guide.md`](./setup-guide.md) — §6 Branch and commit hygiene

---

### A4 — **B** `bootstrap()`

**Explanation:** `strapi.eventHub` exists from the moment Strapi boots, but **plugins and the
DB are not fully wired until Bootstrap**. Subscribing in `register()` means you may miss early
events from other plugins that also register during that phase. `bootstrap()` is the correct
phase for event subscriptions — confirmed by the `buddy-demo.md` Q2 answer and the architecture
lifecycle table.

**Doc reference:** [`buddy-demo.md`](./buddy-demo.md) — Q2 "Important: subscribe only after
bootstrap"; [`architecture.md`](./architecture.md) — §4 App Lifecycle

---

### A5 — **B** Route-level `hasPermissions` policy, then field-level `permissionChecker.cannot.publish()` in the controller

**Explanation:** The route in `routes/admin.ts` applies `plugin::content-manager.hasPermissions`
with `actions: ['plugin::content-manager.explorer.publish']` — this is a coarse RBAC gate. Even
if that passes, the controller calls `permissionChecker.cannot.publish()` which can block
publication at the field or locale level. Both checks live in different files.

**Doc reference:** [`trace-publish.md`](./trace-publish.md) — Step 2 (route) and Step 3
(controller); [`buddy-demo.md`](./buddy-demo.md) — Q1

---

### A6 — **C** Node 22 LTS

**Explanation:** `.nvmrc` pins `20`, but `AGENTS.md` and `CONTRIBUTING.md` state a floor of
`22`. The `package.json` engine field allows `>=20`, so Node 20 won't be *rejected* by Yarn,
but it may expose bugs the core team doesn't test against. Node 22 LTS satisfies every
constraint and is the safest choice. Node 24+ is technically fine but less battle-tested.

**Doc reference:** [`setup-guide.md`](./setup-guide.md) — §0 "Docs vs config mismatch — Node
version" and §1 Prerequisites checklist

---

### A7 — **B** `yarn test:generate-app`

**Explanation:** API integration tests rely on a freshly generated test application. A stale
test app causes misleading failures that have nothing to do with your change. `yarn setup`
rebuilds all packages but does not regenerate the test app. `yarn test:generate-app` creates a
fresh one (variants: `--db=postgres`, `--db=mysql`).

**Doc reference:** [`setup-guide.md`](./setup-guide.md) — §4 "Regenerate the test app before
API tests"

---

### A8 — **B** `isDevelopmentMode` middleware

**Explanation:** The `POST /content-types` route applies two guards in order: first
`admin::hasPermissions` (RBAC), then the `isDevelopmentMode` middleware. If the server is
running in production mode, `isDevelopmentMode` returns `403` before any business logic runs —
schema mutations are intentionally blocked in production to prevent accidental live changes.

**Doc reference:** [`trace-create-content-type.md`](./trace-create-content-type.md) — Step 1
"Route definition"; [`feature-index.md`](./feature-index.md) — Concepts Glossary
"`isDevelopmentMode`"

---

### A9 — **C** `uploadStream` avoids holding the entire file in memory as a buffer

**Explanation:** When the provider implements `uploadStream`, the file is piped as a Node.js
stream directly to the storage backend — no full-file buffer is ever held in memory. If only
the legacy `upload` method is available, the service must call `streamToBuffer` first, loading
the entire file into RAM. The streaming path is preferred for memory efficiency, especially for
large files.

**Doc reference:** [`trace-upload.md`](./trace-upload.md) — Step 7 "Provider service:
`provider.upload` — the storage handoff"

---

### A10 — **C** `yarn test:unit && yarn test:front && yarn test:ts && yarn lint && yarn prettier:check`

**Explanation:** This five-command chain is the mandatory pre-PR suite documented in
`AGENTS.md` and `setup-guide.md`. All five must exit with no errors. `yarn test:api` and
`yarn test:e2e` are additional checks (E2E is enforced by CI) but are not part of the core
mandatory local suite. There is no `yarn ci` or `yarn test:all` shorthand.

**Doc reference:** [`setup-guide.md`](./setup-guide.md) — §6 "Mandatory test suite"

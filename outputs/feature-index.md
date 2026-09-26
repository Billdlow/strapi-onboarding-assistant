# Strapi Monorepo — Feature Trace Index

> A consolidated reference for all traced features. Each row links to the detailed trace
> document, lists the exact entry route, the key files touched, a documentation pointer,
> and the core concepts a developer learns by reading the trace.

---

## Feature Table

| # | Feature | Entry route | Key files | Doc link | Concepts you learn |
|---|---------|------------|-----------|----------|--------------------|
| 1 | **[User login (REST)](trace-login.md)** | `POST /api/auth/local` | `plugins/users-permissions/server/src/routes/content-api/auth.js` · `controllers/auth.js` · `services/user.js` · `services/jwt.js` | [Users & Permissions plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions) | Rate-limit middleware on public routes; Yup body validation before controller logic; bcrypt password comparison via `user.validatePassword`; `jwt.sign` with `jwtSecret`; user-enumeration-safe error messages; email-confirmation and blocked-user guards |
| 2 | **[Publish a document](trace-publish.md)** | `POST /content-manager/collection-types/:model/:id/actions/publish` | `core/content-manager/server/src/routes/admin.ts` · `controllers/collection-types.ts` · `services/document-manager.ts` · `core/core/src/services/document-service/repository.ts` · `entries.ts` | [Document Service API](https://docs.strapi.io/dev-docs/api/document-service) | RBAC route policies + fine-grained field-level permission checks; `strapi.db.transaction` wrapping; draft/published row duality in the DB; relation re-sync after publish; `entry.publish` event on `eventHub` |
| 3 | **[Create a content type](trace-create-content-type.md)** | `POST /content-type-builder/content-types` | `core/content-type-builder/server/src/routes/admin.ts` · `controllers/content-types.ts` · `controllers/validation/content-type.ts` · `services/content-types.ts` · `services/schema-builder/index.ts` · `services/schema-builder/content-type-builder.ts` · `services/schema-builder/schema-handler.ts` | [Content-Type Builder](https://docs.strapi.io/user-docs/content-type-builder) | `isDevelopmentMode` guard blocking schema mutations in production; UID derivation (`api::<name>.<name>`); in-memory schema-handler pattern with `initialState`/`state`/`modified` flags; `fse.writeJSON` persisting `schema.json`; `@strapi/generators` scaffolding the `api/` folder; deferred `strapi.reload()` after telemetry |
| 4 | **[Upload a file (Media Library)](trace-upload.md)** | `POST /upload` (admin) | `core/upload/server/src/routes/admin.ts` · `controllers/admin-upload.ts` · `services/upload.ts` · `services/provider.ts` | [Media Library / Upload plugin](https://docs.strapi.io/user-docs/media-library) | Multipart dispatching (new upload vs replace vs metadata-only); `PermissionsManager` RBAC check inside the controller; MIME-type security validation before processing; `enhanceAndValidateFile` → `formatFileInfo` → hash generation; Sharp image optimisation + thumbnail generation; stream-vs-buffer provider handoff; `media.create` event on `eventHub`; DB persist via `plugin::upload.file` model |

---

## Quick-reference: Change-point Map

| Goal | Feature | Where to make the change |
|------|---------|--------------------------|
| Add MFA / IP-allowlist check on login | User login | `controllers/auth.js` after `user.blocked` check (line 191) |
| Change JWT expiry or algorithm | User login | `config/plugins.js` → `users-permissions.jwt.expiresIn` / `algorithm` |
| Swap bcrypt for argon2 | User login | `services/user.js` `validatePassword` + lifecycle hook that hashes on save |
| Validate required fields before publish | Publish | `controllers/collection-types.ts` inside `publish`, before `documentManager.publish()` |
| Post-publish webhook / CDN invalidation | Publish | Subscribe to `strapi.eventHub.on('entry.publish', ...)` — no core change needed |
| Change the RBAC action for publish | Publish | `routes/admin.ts` line 330 action string + RBAC registration |
| Block reserved `singularName` values | Create content type | Yup schema in `validation/content-type.ts` `createContentTypeSchema` |
| Change `schema.json` formatting or path | Create content type | `schema-handler.ts` `flush()` — `fse.writeJSON` args at line 265 |
| Post-create seed / webhook | Create content type | Subscribe to `strapi.eventHub.on('content-type.create', ...)` — no core change needed |
| Block a file extension before upload | Upload | `db.lifecycles.subscribe({ beforeCreate })` on `plugin::upload.file` |
| Change global file size limit | Upload | `config/plugins.ts` `upload.config.sizeLimit` |
| Post-upload index / webhook | Upload | Subscribe to `strapi.eventHub.on('media.create', ...)` — no core change needed |

---

## Concepts Glossary

| Term | Appears in | Meaning |
|------|-----------|---------|
| **Document Service** | Publish, Create CT | Framework-level API wrapping DB queries with draft/publish, locale, and relation logic |
| **SchemaHandler** | Create CT | In-memory wrapper around a `schema.json` file; tracks `modified` state and flushes to disk |
| **`strapi.db.transaction`** | Publish | Knex-backed transaction wrapper; rolls back DB writes on error |
| **`eventHub`** | Publish, Create CT, Upload | Internal pub/sub bus; subscribe in plugins without modifying core |
| **PermissionsManager** | Upload | Per-request RBAC helper; `cannot(action)` checks user abilities |
| **`isDevelopmentMode`** | Create CT | Middleware that returns 403 in non-development environments |
| **`rateLimit` middleware** | Login | Per-IP request throttle applied at the route level |
| **Provider** | Upload | Pluggable storage backend; implements `uploadStream(file)` or `upload(file)` |
| **`jwtSecret`** | Login | Signing key read from `config/plugins.js`; rotatable without code changes |
| **`fse.writeJSON`** | Create CT | `fs-extra` helper that writes a JSON file with configurable indentation |

---

*All traces generated from `target/strapi` source. Lines cited are from files actually opened;
uncertain items are marked **UNVERIFIED:** in each trace document.*

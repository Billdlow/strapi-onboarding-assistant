# Act as an orchestrator. Split this into 3 independent subtasks and delegate each to its own subtask so they can run separately. Each subtask traces one feature of the Strapi monorepo at target/strapi, using outputs/trace-publish.md as the format template (numbered steps with file:line, a Mermaid sequence diagram, and "Where would I change X?").

Subtask A — User login (REST): POST /api/auth/local
- Route: target/strapi/packages/plugins/users-permissions/server/src/routes/content-api/auth.js
- Controller: target/strapi/packages/plugins/users-permissions/server/src/controllers/auth.js (callback)
- Follow into services/ and strategies/ only as far as issuing the JWT.
- Output: outputs/trace-login.md
Subtask B — Creating a content type in the Content-Type Builder
- Route: target/strapi/packages/core/content-type-builder/server/src/routes/admin.ts (POST /content-types → content-types.createContentType)
- Controller: target/strapi/packages/core/content-type-builder/server/src/controllers/content-types.ts (createContentType)
- Follow into services/content-types.ts and services/schema-builder until the schema.json file is written to disk.
- Output: outputs/trace-create-content-type.md
Subtask C — Uploading a file in the Media Library
- Route: target/strapi/packages/core/upload/server/src/routes/admin.ts (POST /)
- Controller: target/strapi/packages/core/upload/server/src/controllers/admin-upload.ts (upload / uploadFiles)
- Follow into services/upload.ts and services/provider.ts until the provider is called.
- Output: outputs/trace-upload.md

Rules for every subtask: use search to jump to functions instead of reading whole files; never read "ee" directories; cite only lines actually opened; mark guesses "UNVERIFIED:".

When all 3 are done, write outputs/feature-index.md: a table of all traced features (including the existing publish trace) with columns Feature | Entry route | Key files | Doc link | "Concepts you learn".

---

**Status:** active  **Date:** 2026-09-26

---

### 👤 User

Act as an orchestrator. Split this into 3 independent subtasks and delegate each to its own subtask so they can run separately. Each subtask traces one feature of the Strapi monorepo at target/strapi, using outputs/trace-publish.md as the format template (numbered steps with file:line, a Mermaid sequence diagram, and "Where would I change X?").

Subtask A — User login (REST): POST /api/auth/local
- Route: target/strapi/packages/plugins/users-permissions/server/src/routes/content-api/auth.js
- Controller: target/strapi/packages/plugins/users-permissions/server/src/controllers/auth.js (callback)
- Follow into services/ and strategies/ only as far as issuing the JWT.
- Output: outputs/trace-login.md
Subtask B — Creating a content type in the Content-Type Builder
- Route: target/strapi/packages/core/content-type-builder/server/src/routes/admin.ts (POST /content-types → content-types.createContentType)
- Controller: target/strapi/packages/core/content-type-builder/server/src/controllers/content-types.ts (createContentType)
- Follow into services/content-types.ts and services/schema-builder until the schema.json file is written to disk.
- Output: outputs/trace-create-content-type.md
Subtask C — Uploading a file in the Media Library
- Route: target/strapi/packages/core/upload/server/src/routes/admin.ts (POST /)
- Controller: target/strapi/packages/core/upload/server/src/controllers/admin-upload.ts (upload / uploadFiles)
- Follow into services/upload.ts and services/provider.ts until the provider is called.
- Output: outputs/trace-upload.md

Rules for every subtask: use search to jump to functions instead of reading whole files; never read "ee" directories; cite only lines actually opened; mark guesses "UNVERIFIED:".

When all 3 are done, write outputs/feature-index.md: a table of all traced features (including the existing publish trace) with columns Feature | Entry route | Key files | Doc link | "Concepts you learn".

---

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — outputs/trace-publish.md

### 🤖 Assistant

> 🔧 called: update_todo_list

Now I have the format template. Let me start all 3 subtasks in parallel.

> 🔧 **update_todo_list** — 
[-] Start subtask A: Trace user login (POST /api/auth/local)
[ ] Start subtask B: Trace content-type creation in Content-Type Builder
[ ] Start subtask C: Trace file upload in Media Library
[ ] Write outputs/feature-index.md with all 4 features


### 🤖 Assistant

> 🔧 called: start_subtask



> 🔧 **start_subtask** — Subtask A — Trace: User Login (POST /api/auth/local)

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Start subtask A: Trace user login (POST /api/auth/local)
[-] Start subtask B: Trace content-type creation in Content-Type Builder
[ ] Start subtask C: Trace file upload in Media Library
[ ] Write outputs/feature-index.md with all 4 features


### 🤖 Assistant

> 🔧 called: start_subtask



> 🔧 **start_subtask** — 
You are tracing the "Create a content type" flow in the Strapi monorepo at `target/strapi`. Your output must be written to `outputs/trace-create-content-type.md`.

**Format template** (from `outputs/trace-publish.md`):
- Numbered steps, each with `File: path · lines X–Y` and a short explanation
- A Mermaid sequence diagram summarising the full call chain
- A "Where Would I Change X?" section with 2–3 practical change points
- Mark uncertain items **UNVERIFIED:**
- Only cite lines you actually opened; never read `ee` directories

---

**Entry points to trace:**

1. **Route:** `target/strapi/packages/core/content-type-builder/server/src/routes/admin.ts`
   - Find the `POST /content-types` route entry and which handler it maps to (expected: `content-types.createContentType`)

2. **Controller:** `target/strapi/packages/core/content-type-builder/server/src/controllers/content-types.ts`
   - Find the `createContentType` function
   - Trace: how it reads the request body, which service it calls

3. **Service:** `target/strapi/packages/core/content-type-builder/server/src/services/content-types.ts`
   - Find the `createContentType` function in the service
   - Trace: how it validates / builds the schema

4. **Schema builder:** `target/strapi/packages/core/content-type-builder/server/src/services/schema-builder/`
   - Follow the schema builder until the schema.json file is written to disk (look for `fs.writeFile`, `writeFile`, or similar file-system write calls)

**Rules:**
- Use `FindSymbol` or `grep` to jump to functions; do not read whole files
- Never enter any `ee/` directory
- Cite only lines you actually open
- Mark guesses **UNVERIFIED:**

**Output file:** `outputs/trace-create-content-type.md`

Write the full document in the same style as `outputs/trace-publish.md` (numbered steps, Mermaid diagram, Where Would I Change X?).


### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Start subtask A: Trace user login (POST /api/auth/local)
[x] Start subtask B: Trace content-type creation in Content-Type Builder
[-] Start subtask C: Trace file upload in Media Library
[ ] Write outputs/feature-index.md with all 4 features


### 🤖 Assistant

> 🔧 called: start_subtask



> 🔧 **start_subtask** — 
You are tracing the "Upload a file" flow in the Strapi Media Library in the Strapi monorepo at `target/strapi`. Your output must be written to `outputs/trace-upload.md`.

**Format template** (from `outputs/trace-publish.md`):
- Numbered steps, each with `File: path · lines X–Y` and a short explanation
- A Mermaid sequence diagram summarising the full call chain
- A "Where Would I Change X?" section with 2–3 practical change points
- Mark uncertain items **UNVERIFIED:**
- Only cite lines you actually opened; never read `ee` directories

---

**Entry points to trace:**

1. **Route:** `target/strapi/packages/core/upload/server/src/routes/admin.ts`
   - Find the `POST /` route entry and which handler it maps to (expected: something like `admin-upload.upload` or `admin-upload.uploadFiles`)

2. **Controller:** `target/strapi/packages/core/upload/server/src/controllers/admin-upload.ts`
   - Find the `upload` or `uploadFiles` function
   - Trace: how it reads the multipart request, which service it calls

3. **Upload service:** `target/strapi/packages/core/upload/server/src/services/upload.ts`
   - Find the main upload orchestration function (may be called `upload`, `uploadFiles`, or similar)
   - Follow how it processes the file(s), calls formatFileInfo, sendFile, etc.

4. **Provider service:** `target/strapi/packages/core/upload/server/src/services/provider.ts`
   - Find the function that actually calls the underlying storage provider (e.g., local disk, S3)
   - This is the final handoff — the moment `provider.upload(file)` or equivalent is called

**Rules:**
- Use `FindSymbol` or `grep` to jump to functions; do not read whole files
- Never enter any `ee/` directory
- Cite only lines you actually open
- Mark guesses **UNVERIFIED:**

**Output file:** `outputs/trace-upload.md`

Write the full document in the same style as `outputs/trace-publish.md` (numbered steps, Mermaid diagram, Where Would I Change X?).


### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Start subtask A: Trace user login (POST /api/auth/local)
[x] Start subtask B: Trace content-type creation in Content-Type Builder
[x] Start subtask C: Trace file upload in Media Library
[-] Write outputs/feature-index.md with all 4 features


### 🤖 Assistant

> 🔧 called: read_file, read_file, read_file

Now let me read the three output files to pull the exact details for the index.

> 🔧 **read_file** — outputs/trace-login.md

> 🔧 **read_file** — outputs/trace-upload.md

> 🔧 **read_file** — outputs/trace-create-content-type.md

### 🤖 Assistant

> 🔧 called: write_file

All three traces are complete and detailed. Now I'll write the feature index.

> 🔧 **write_file** — outputs/feature-index.md

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Start subtask A: Trace user login (POST /api/auth/local)
[x] Start subtask B: Trace content-type creation in Content-Type Builder
[x] Start subtask C: Trace file upload in Media Library
[x] Write outputs/feature-index.md with all 4 features


### 🤖 Assistant

All four tasks are done. Here's what was produced:

---

### Outputs written

| File | What it contains |
|------|-----------------|
| [`outputs/trace-login.md`](outputs/trace-login.md) | **8-step trace** of `POST /api/auth/local` — route → rateLimit → `callback` controller → DB user lookup → `bcrypt.compare` → `jwt.sign` → `200 {jwt, user}`. Mermaid diagram + 3 change-point sections. |
| [`outputs/trace-create-content-type.md`](outputs/trace-create-content-type.md) | **6-step trace** of the Content-Type Builder — route → Yup validation → service → `createBuilder()` → `SchemaHandler` (in-memory) → `fse.writeJSON` to `schema.json` on disk. Covers the deferred `strapi.reload()` and `@strapi/generators` scaffold. |
| [`outputs/trace-upload.md`](outputs/trace-upload.md) | **8-step trace** of a Media Library upload — route → dispatcher → `uploadFiles` RBAC check → `upload` service → `enhanceAndValidateFile` + Sharp optimisation → `checkFileSize` → `provider.uploadStream` → `db.query.create` + `media.create` event. |
| [`outputs/feature-index.md`](outputs/feature-index.md) | **Master index** with 4-column feature table (Feature, Entry route, Key files, Doc link, Concepts you learn) + a quick-reference change-point map for 12 common modifications + a concepts glossary. |

---

### Key patterns that appear across all traces

- **`eventHub` as the extension seam** — every feature emits an event at the end (`entry.publish`, `content-type.create`, `media.create`). Subscribe in your plugin's bootstrap and no core files ever need touching.
- **Guard placement** — route-level RBAC policy for coarse access, then a second fine-grained check inside the controller (field-level permissions in Publish, `PermissionsManager` in Upload).
- **Yup validation at the controller boundary** — all three features validate the request body via a Yup schema before any mutation or DB call.
- **`isDevelopmentMode` blocks schema mutations** — the Content-Type Builder route returns 403 in production, preventing accidental schema changes at runtime.
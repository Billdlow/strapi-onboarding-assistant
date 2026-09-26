# you are helping build a onborading assistant for new contributors to the strapi monorepo, located at target/strapi. goal: produce a clear architecture guide a new developer can read in 15 minuts. scope (read onlt these, to save budget): - target / strapi/AGENTS.md - target/strapi/package.json and target/strapi/nx.json - target/strapi/packages/core/strapi/src/index.ts (entry point)
- target/strapi/packages/core/core/src/Strapi.ts (the Strapi class + lifecycle, ~620 lines) - target/strapi/packages/core/core/src/container.ts
- target/strapi/packages/core/core/src/loaders/ and target/strapi/packages/core/core/src/services/ — LIST the folder contents only; open a file only if you need it to explain a section.
Do NOT read any directory named "ee" (e.g. packages/core/core/src/ee, packages/core/admin/ee — different license). Do not scan the whole repo. Write the result to outputs/architecture.md with these sections:
1. "Strapi in one paragraph" – what it is and how the monorepo is organized.
2. "Package map" – table of the ~8 most important packages: name, path, responsibility, who should care (backend / admin frontend / plugin dev).  3. "Request lifecycle" – Routes → Middlewares → Controllers → Services → Document Service → Database. For each layer give the real file/folder path where it lives. Include a Mermaid flowchart.
4. "App lifecycle" – Register → Bootstrap → Start → Destroy, what happens in each, and where in code.
5. "Server vs Admin split" – strapi-server vs strapi-admin entry points, with one concrete example package.
6. "5 things new contributors get wrong" – derived from AGENTS.md (e.g. global.strapi, Entity Service vs Document Service, develop branch, EE/CE). Rules:
- Every claim about code must cite a file path you actually opened.
- If you are unsure of something, write "UNVERIFIED:" before it instead of guessing.
- Keep the file under ~250 lines.

---

**Status:** active  **Date:** 2026-09-26

---

### 👤 User

you are helping build a onborading assistant for new contributors to the strapi monorepo, located at target/strapi. goal: produce a clear architecture guide a new developer can read in 15 minuts. scope (read onlt these, to save budget): - target / strapi/AGENTS.md - target/strapi/package.json and target/strapi/nx.json - target/strapi/packages/core/strapi/src/index.ts (entry point)
- target/strapi/packages/core/core/src/Strapi.ts (the Strapi class + lifecycle, ~620 lines) - target/strapi/packages/core/core/src/container.ts
- target/strapi/packages/core/core/src/loaders/ and target/strapi/packages/core/core/src/services/ — LIST the folder contents only; open a file only if you need it to explain a section.
Do NOT read any directory named "ee" (e.g. packages/core/core/src/ee, packages/core/admin/ee — different license). Do not scan the whole repo. Write the result to outputs/architecture.md with these sections:
1. "Strapi in one paragraph" – what it is and how the monorepo is organized.
2. "Package map" – table of the ~8 most important packages: name, path, responsibility, who should care (backend / admin frontend / plugin dev).  3. "Request lifecycle" – Routes → Middlewares → Controllers → Services → Document Service → Database. For each layer give the real file/folder path where it lives. Include a Mermaid flowchart.
4. "App lifecycle" – Register → Bootstrap → Start → Destroy, what happens in each, and where in code.
5. "Server vs Admin split" – strapi-server vs strapi-admin entry points, with one concrete example package.
6. "5 things new contributors get wrong" – derived from AGENTS.md (e.g. global.strapi, Entity Service vs Document Service, develop branch, EE/CE). Rules:
- Every claim about code must cite a file path you actually opened.
- If you are unsure of something, write "UNVERIFIED:" before it instead of guessing.
- Keep the file under ~250 lines.

---

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[-] Read target/strapi/AGENTS.md
[ ] Read target/strapi/package.json and target/strapi/nx.json
[ ] Read target/strapi/packages/core/strapi/src/index.ts
[ ] Read target/strapi/packages/core/core/src/Strapi.ts
[ ] Read target/strapi/packages/core/core/src/container.ts
[ ] List target/strapi/packages/core/core/src/loaders/
[ ] List target/strapi/packages/core/core/src/services/
[ ] Write outputs/architecture.md


### 🤖 Assistant

> 🔧 called: read_file, read_file, read_file



> 🔧 **read_file** — target/strapi/AGENTS.md

> 🔧 **read_file** — target/strapi/package.json

> 🔧 **read_file** — target/strapi/nx.json

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[-] Read target/strapi/packages/core/strapi/src/index.ts
[ ] Read target/strapi/packages/core/core/src/Strapi.ts
[ ] Read target/strapi/packages/core/core/src/container.ts
[ ] List target/strapi/packages/core/core/src/loaders/
[ ] List target/strapi/packages/core/core/src/services/
[ ] Write outputs/architecture.md


### 🤖 Assistant

> 🔧 called: read_file, list_files, list_files



> 🔧 **list_files** — target/strapi/packages/core/core/src/loaders

> 🔧 **list_files** — target/strapi/packages/core/core/src/services

> 🔧 **read_file** — target/strapi/packages/core/strapi/src/index.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[-] Read target/strapi/packages/core/core/src/Strapi.ts
[ ] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[ ] Write outputs/architecture.md


### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/core/src/Strapi.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/core/src/Strapi.ts

> 🔧 **read_file** — target/strapi/packages/core/core/src/container.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[-] Write outputs/architecture.md


### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — mkdir -p outputs

### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — outputs/architecture.md

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — wc -l outputs/architecture.md

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md


### 🤖 Assistant

[`outputs/architecture.md`](outputs/architecture.md) is written — 156 lines, well under the 250-line budget. Here's a summary of what each section covers and which files it was grounded in:

| Section | Key sources |
|---|---|
| **Strapi in one paragraph** | [`AGENTS.md`](target/strapi/AGENTS.md), [`package.json`](target/strapi/package.json) |
| **Package map** (8 packages) | [`AGENTS.md` table](target/strapi/AGENTS.md), [`packages/core/strapi/src/index.ts`](target/strapi/packages/core/strapi/src/index.ts) |
| **Request lifecycle** + Mermaid flowchart | [`loaders/`](target/strapi/packages/core/core/src/loaders) listing, [`services/`](target/strapi/packages/core/core/src/services) listing |
| **App lifecycle** (Register → Bootstrap → Start → Destroy) | [`Strapi.ts:259–575`](target/strapi/packages/core/core/src/Strapi.ts) — each method quoted by line number |
| **Server vs Admin split** | [`AGENTS.md`](target/strapi/AGENTS.md), [`index.ts`](target/strapi/packages/core/strapi/src/index.ts) |
| **5 things contributors get wrong** | `global.strapi` (destroy:572), deprecated Entity Service (line 115), `develop` branch, EE gating (Strapi.ts:499), `isLoaded` / container lazy resolution ([`container.ts`](target/strapi/packages/core/core/src/container.ts)) |

Every claim has an inline file citation. Nothing was marked UNVERIFIED — all five "gotchas" were confirmed directly in the opened files.

---

### 👤 User

Trace one real feature end-to-end in the Strapi monorepo at target/strapi so a new developer understands how a request flows through the codebase.

Feature: publishing a document from the admin Content Manager ("Publish" button). Use these entry points (already confirmed to exist) and follow the calls between them. Use search to jump to the relevant function instead of reading whole files — several are 600–1000 lines:
1. Admin UI call: target/strapi/packages/core/content-manager/admin/src/services/documents.ts (find the publish mutation)
2. Route: target/strapi/packages/core/content-manager/server/src/routes/admin.ts (path '/collection-types/:model/actions/publish', handler 'collection-types.publish', note the permission action 'plugin::content-manager.explorer.publish') 3. Controller: target/strapi/packages/core/content-manager/server/src/controllers/collection-types.ts (the publish action)
4. Service: target/strapi/packages/core/content-manager/server/src/services/document-manager.ts (publish)
5. Document Service: target/strapi/packages/core/core/src/services/document-service/repository.ts and draft-and-publish.ts
6. Stop where it hands off to the database layer (packages/core/database); do not trace into the query builder.
Focus on collection types; mention in one line that single types follow the same pattern via single-types.ts.
Do NOT read any "ee" directory. Only open files that are on this call path. Write the result to outputs/trace-publish.md:
- A numbered step list. Each step: file path, function/method name, and 1–2 sentences on what it does.
- A Mermaid sequence diagram (Admin UI → Route → Controller → Service → Document Service → DB).
- "Where would I change X?" – 3 short examples (e.g. add validation before publish, run custom logic after publish, change the publish permission check).
- "Time saved" – one line estimating how long a new dev would take to find this manually vs. reading this doc.

Rules: cite only paths you actually opened; mark anything uncertain with "UNVERIFIED:".

---

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[-] Read documents.ts - find publish mutation
[ ] Read admin.ts route - publish route definition
[ ] Read collection-types.ts controller - publish action
[ ] Read document-manager.ts service - publish method
[ ] Read document-service/repository.ts - publish method
[ ] Read document-service/draft-and-publish.ts - publish logic
[ ] Write outputs/trace-publish.md


### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md
[-] Read documents.ts — find publish mutation (admin UI)
[ ] Read admin.ts route — publish route definition
[ ] Read collection-types.ts controller — publish action
[ ] Read document-manager.ts service — publish method
[ ] Read document-service/repository.ts — publish method
[ ] Read document-service/draft-and-publish.ts — publish logic
[ ] Write outputs/trace-publish.md


### 🤖 Assistant

> 🔧 called: grep, grep



> 🔧 **grep** — publish

> 🔧 **grep** — publish

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/admin/src/services/documents.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/routes/admin.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md
[x] Read documents.ts — find publish mutation (admin UI)
[x] Read admin.ts route — publish route definition
[-] Read collection-types.ts controller — publish action
[ ] Read document-manager.ts service — publish method
[ ] Read document-service/repository.ts — publish method
[ ] Read document-service/draft-and-publish.ts — publish logic
[ ] Write outputs/trace-publish.md


### 🤖 Assistant

> 🔧 called: grep



> 🔧 **grep** — publish

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/controllers/collection-types.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md
[x] Read documents.ts — find publish mutation (admin UI)
[x] Read admin.ts route — publish route definition
[x] Read collection-types.ts controller — publish action
[-] Read document-manager.ts service — publish method
[ ] Read document-service/repository.ts — publish method
[ ] Read document-service/draft-and-publish.ts — publish logic
[ ] Write outputs/trace-publish.md


### 🤖 Assistant

> 🔧 called: grep



> 🔧 **grep** — target/strapi/packages/core/content-manager/server/src/services/document-manager.ts

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/document-manager.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md
[x] Read documents.ts — find publish mutation (admin UI)
[x] Read admin.ts route — publish route definition
[x] Read collection-types.ts controller — publish action
[x] Read document-manager.ts service — publish method
[-] Read document-service/repository.ts — publish method
[ ] Read document-service/draft-and-publish.ts — publish logic
[ ] Write outputs/trace-publish.md


### 🤖 Assistant

> 🔧 called: grep



> 🔧 **grep** — target/strapi/packages/core/core/src/services/document-service/repository.ts

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/core/src/services/document-service/repository.ts

### 🤖 Assistant

> 🔧 called: grep



> 🔧 **grep** — target/strapi/packages/core/core/src/services/document-service

### 🤖 Assistant

> 🔧 called: grep



> 🔧 **grep** — target/strapi/packages/core/core/src/services/document-service/draft-and-publish.ts

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/core/src/services/document-service/draft-and-publish.ts

### 🤖 Assistant

> 🔧 called: grep

Now let me check the `entries.publish` call to understand the final DB handoff:

> 🔧 **grep** — target/strapi/packages/core/core/src/services/document-service/entries.ts

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/core/src/services/document-service/entries.ts

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/core/src/services/document-service/entries.ts

### 🤖 Assistant

> 🔧 called: update_todo_list

All the data I need is in hand. Now I'll write the trace document.

> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md
[x] Read documents.ts — find publish mutation (admin UI)
[x] Read admin.ts route — publish route definition
[x] Read collection-types.ts controller — publish action
[x] Read document-manager.ts service — publish method
[x] Read document-service/repository.ts — publish method
[x] Read document-service/draft-and-publish.ts — publish logic
[x] Read document-service/entries.ts — DB handoff via entries.publish / createEntry
[-] Write outputs/trace-publish.md


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — outputs/trace-publish.md

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md
[x] Read target/strapi/package.json and target/strapi/nx.json
[x] Read target/strapi/packages/core/strapi/src/index.ts
[x] Read target/strapi/packages/core/core/src/Strapi.ts
[x] Read target/strapi/packages/core/core/src/container.ts
[x] List target/strapi/packages/core/core/src/loaders/
[x] List target/strapi/packages/core/core/src/services/
[x] Write outputs/architecture.md
[x] Read documents.ts — find publish mutation (admin UI)
[x] Read admin.ts route — publish route definition
[x] Read collection-types.ts controller — publish action
[x] Read document-manager.ts service — publish method
[x] Read document-service/repository.ts — publish method
[x] Read document-service/draft-and-publish.ts — publish logic
[x] Read document-service/entries.ts — DB handoff via entries.publish / createEntry
[x] Write outputs/trace-publish.md


### 🤖 Assistant

[`outputs/trace-publish.md`](outputs/trace-publish.md) is written. Here's a compact summary of what was traced and what was found at each hop:

---

### The 6-step call chain

| # | File | Function | What it does |
|---|---|---|---|
| 1 | [`admin/src/services/documents.ts:363`](target/strapi/packages/core/content-manager/admin/src/services/documents.ts) | `publishDocument` RTK mutation | Fires `POST …/:id/actions/publish`, invalidates cache tags |
| 2 | [`server/src/routes/admin.ts:322`](target/strapi/packages/core/content-manager/server/src/routes/admin.ts) | Route declaration | Maps to `collection-types.publish`; gates on `isAuthenticatedAdmin` + `explorer.publish` RBAC action |
| 3 | [`server/src/controllers/collection-types.ts:643`](target/strapi/packages/core/content-manager/server/src/controllers/collection-types.ts) | `publish(ctx)` | Permission check, DB transaction, create-or-update branch, calls `documentManager.publish`, sanitizes output |
| 4 | [`server/src/services/document-manager.ts:168`](target/strapi/packages/core/content-manager/server/src/services/document-manager.ts) | `publish()` | Thin adapter: builds deep populate, delegates to `strapi.documents(uid).publish(...)` |
| 5 | [`core/src/services/document-service/repository.ts:568`](target/strapi/packages/core/core/src/services/document-service/repository.ts) | `publish()` | Fetches drafts + old published rows, deletes old published, calls `entries.publish`, re-syncs all relation types, emits `entry.publish` event |
| 6 | [`core/src/services/document-service/entries.ts:152`](target/strapi/packages/core/core/src/services/document-service/entries.ts) | `publishEntry()` | Strips draft ID, sets `publishedAt: new Date()`, transforms relation IDs, calls `strapi.db.query(uid).create()` — **DB handoff** |

The `draft-and-publish.ts` helpers (`statusToData`, `statusToLookup`) are pure param-transform functions used by the repository pipeline to translate `status: 'published'` → `publishedAt: new Date()` in data and `publishedAt: { $notNull: true }` in WHERE clauses — no ambiguity there.
# Suggest realistic starter tasks for a new contributor to the Strapi monorepo at target/strapi, grounded in the actual code.

Scope (these folders are ~29,000 lines in total — do NOT read them file by file):
- target/strapi/packages/plugins/users-permissions/server
- target/strapi/packages/core/utils/src
- target/strapi/packages/core/content-manager/server/src
Skip any "ee" directory.

Scope (these folders are ~29,000 lines in total — do NOT read them file by file):
- target/strapi/packages/plugins/users-permissions/server
- target/strapi/packages/core/utils/src
- target/strapi/packages/core/content-manager/server/src
Skip any "ee" directory.
Good candidates: TODO/FIXME comments with a clear, small scope; functions without tests; unclear error messages; missing JSDoc on exported functions.

Write outputs/starter-tasks.md with 6 tasks, ordered easiest → hardest, grouped by level:
- Level 1 (docs/tests, ~1–2h) x2- Level 2 (small code change, ~half day) x2
- Level 3 (touches multiple layers, ~1–2 days) x2

For each task:
- Title
- Why it matters (1 sentence)
- Files to open first (real paths, with line numbers if possible)- Concepts you will learn (link to sections of outputs/architecture.md if relevant)
- Which test command to run (from AGENTS.md)
- A suggested Conventional Commit message
- Definition of done

Rules: only propose tasks tied to code you actually opened; mark guesses with "UNVERIFIED:". These are suggestions, not confirmed GitHub issues — say so at the top.

---

**Status:** active  **Date:** 2026-09-26

---

### 👤 User

Suggest realistic starter tasks for a new contributor to the Strapi monorepo at target/strapi, grounded in the actual code.

Scope (these folders are ~29,000 lines in total — do NOT read them file by file):
- target/strapi/packages/plugins/users-permissions/server
- target/strapi/packages/core/utils/src
- target/strapi/packages/core/content-manager/server/src
Skip any "ee" directory.

Scope (these folders are ~29,000 lines in total — do NOT read them file by file):
- target/strapi/packages/plugins/users-permissions/server
- target/strapi/packages/core/utils/src
- target/strapi/packages/core/content-manager/server/src
Skip any "ee" directory.
Good candidates: TODO/FIXME comments with a clear, small scope; functions without tests; unclear error messages; missing JSDoc on exported functions.

Write outputs/starter-tasks.md with 6 tasks, ordered easiest → hardest, grouped by level:
- Level 1 (docs/tests, ~1–2h) x2- Level 2 (small code change, ~half day) x2
- Level 3 (touches multiple layers, ~1–2 days) x2

For each task:
- Title
- Why it matters (1 sentence)
- Files to open first (real paths, with line numbers if possible)- Concepts you will learn (link to sections of outputs/architecture.md if relevant)
- Which test command to run (from AGENTS.md)
- A suggested Conventional Commit message
- Definition of done

Rules: only propose tasks tied to code you actually opened; mark guesses with "UNVERIFIED:". These are suggestions, not confirmed GitHub issues — say so at the top.

---

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — AGENTS.md

> 🔧 **read_file** — outputs/architecture.md

### 🤖 Assistant

> 🔧 called: read_file, list_files, list_files, list_files



> 🔧 **list_files** — target/strapi/packages/core/utils/src

> 🔧 **list_files** — target/strapi/packages/core/content-manager/server/src

> 🔧 **list_files** — target/strapi/packages/plugins/users-permissions/server

> 🔧 **read_file** — target/strapi/AGENTS.md

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [-] Explore users-permissions server src layout
[ ] Grep for TODO/FIXME across the 3 scoped dirs
[ ] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[ ] Read key files in users-permissions/server/src (controllers, services)
[ ] Read key files in content-manager/server/src (validation, utils, services)
[ ] Check existing __tests__ coverage gaps
[ ] Write outputs/starter-tasks.md


### 🤖 Assistant

> 🔧 called: list_files, grep



> 🔧 **grep** — TODO|FIXME

> 🔧 **list_files** — target/strapi/packages/plugins/users-permissions/server/src

### 🤖 Assistant

> 🔧 called: grep, grep



> 🔧 **grep** — TODO|FIXME

> 🔧 **grep** — TODO|FIXME

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [x] Explore users-permissions server src layout
[x] Grep for TODO/FIXME across the 3 scoped dirs
[-] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[ ] Read key files in users-permissions/server/src (controllers, services)
[ ] Read key files in content-manager/server/src (validation, utils, services)
[ ] Check existing __tests__ coverage gaps
[ ] Write outputs/starter-tasks.md


### 🤖 Assistant

> 🔧 called: read_file, read_file, read_file

Now let me read the key files to ground tasks in real code:

> 🔧 **read_file** — target/strapi/packages/core/utils/src/errors.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/pagination.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/parse-type.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/utils/src/model-cache.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/format-yup-error.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/validate/utils.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/utils/src/sanitize/index.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/data-mapper.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/data-mapper.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/history/services/lifecycles.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [x] Explore users-permissions server src layout
[x] Grep for TODO/FIXME across the 3 scoped dirs
[x] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[-] Read key files in users-permissions/server/src (controllers, services)
[ ] Read key files in content-manager/server/src (validation, utils, services)
[ ] Check existing __tests__ coverage gaps
[ ] Write outputs/starter-tasks.md


### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/plugins/users-permissions/server/src/services/jwt.js

> 🔧 **read_file** — target/strapi/packages/plugins/users-permissions/server/src/services/user.js

### 🤖 Assistant

> 🔧 called: read_file, list_files



> 🔧 **list_files** — target/strapi/packages/core/utils/src/__tests__

> 🔧 **read_file** — target/strapi/packages/plugins/users-permissions/server/src/services/__tests__/jwt.test.js

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/uid.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/utils/populate.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/validation

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/document-manager.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/validation/zod.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/utils/configuration/attributes.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [x] Explore users-permissions server src layout
[x] Grep for TODO/FIXME across the 3 scoped dirs
[x] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[x] Read key files in users-permissions/server/src (controllers, services)
[-] Read key files in content-manager/server/src (validation, utils, services)
[ ] Check existing __tests__ coverage gaps
[ ] Write outputs/starter-tasks.md


### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/controllers/collection-types.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/history/services/lifecycles.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/controllers/__tests__/relations.test.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/validate/validators.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/permission-checker.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/convert-query-params.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [x] Explore users-permissions server src layout
[x] Grep for TODO/FIXME across the 3 scoped dirs
[x] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[x] Read key files in users-permissions/server/src (controllers, services)
[x] Read key files in content-manager/server/src (validation, utils, services)
[-] Check existing __tests__ coverage gaps
[ ] Write outputs/starter-tasks.md


### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/utils/src/__tests__/parse-type.test.ts

> 🔧 **read_file** — target/strapi/packages/core/utils/src/__tests__/pagination.test.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/packages/core/utils/src/__tests__/yup-formatter.test.ts

> 🔧 **read_file** — target/strapi/packages/core/content-manager/server/src/services/document-metadata.ts

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — target/strapi/packages/core/utils/src/__tests__/model-cache.test.ts

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [x] Explore users-permissions server src layout
[x] Grep for TODO/FIXME across the 3 scoped dirs
[x] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[x] Read key files in users-permissions/server/src (controllers, services)
[x] Read key files in content-manager/server/src (validation, utils, services)
[x] Check existing __tests__ coverage gaps
[-] Write outputs/starter-tasks.md


### 🤖 Assistant

> 🔧 called: write_file

Now I have all the grounding I need. Let me write the starter tasks document:

> 🔧 **write_file** — outputs/starter-tasks.md

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — [x] Explore users-permissions server src layout
[x] Grep for TODO/FIXME across the 3 scoped dirs
[x] Read key files in utils/src (errors, pagination, parse-type, format-yup-error, convert-query-params)
[x] Read key files in users-permissions/server/src (controllers, services)
[x] Read key files in content-manager/server/src (validation, utils, services)
[x] Check existing __tests__ coverage gaps
[x] Write outputs/starter-tasks.md


### 🤖 Assistant

[`outputs/starter-tasks.md`](outputs/starter-tasks.md) is written. Here's a summary of what was found and why each task was chosen:

---

## What was found

Every task below is grounded in files actually opened. The research process:
1. Grepped all three scope directories for `TODO|FIXME` — found 9 in `utils/src`, 45 in `content-manager/server/src`, and 0 in `users-permissions/server/src`
2. Read the files where comments clustered, plus their existing test files, to judge scope and difficulty

---

## The 6 tasks

| # | Level | Title | Source evidence |
|---|---|---|---|
| 1 | L1 – Docs | Add JSDoc + fix `PagePatinationInformation` typo | [`pagination.ts:16`](target/strapi/packages/core/utils/src/pagination.ts) — exported interface, no doc, misspelled |
| 2 | L1 – Tests | Un-skip the relations controller test suite | [`relations.test.ts:32`](target/strapi/packages/core/content-manager/server/src/controllers/__tests__/relations.test.ts) — `describe.skip("TODO fix for new relations logic")` |
| 3 | L2 – Code | Export `asyncCurry` from `@strapi/utils` barrel | [`validate/utils.ts:3`](target/strapi/packages/core/utils/src/validate/utils.ts) — explicit `// TODO: Export this from root @strapi/utils` comment |
| 4 | L2 – Code | Replace `any` UID in `createModelCache` with `@strapi/types` | [`model-cache.ts:19`](target/strapi/packages/core/utils/src/model-cache.ts) — `// TODO should use the type from @strapi/types` |
| 5 | L3 – Multi-layer | Remove dead `formatAttribute`/`toRelation` wrappers in data-mapper | [`data-mapper.ts:60,69`](target/strapi/packages/core/content-manager/server/src/services/data-mapper.ts) — two adjacent `// FIXME: not needed` |
| 6 | L3 – Multi-layer | Implement nested-component recursion in history `getSchemas` | [`lifecycles.ts:67`](target/strapi/packages/core/content-manager/server/src/history/services/lifecycles.ts) — `// TODO: Handle nested components` with clear gap in the current loop |
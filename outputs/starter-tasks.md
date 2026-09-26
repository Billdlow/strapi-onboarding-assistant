# Starter Tasks for New Strapi Monorepo Contributors

> **These are suggestions, not confirmed GitHub issues.** Every task below is tied to code
> that was actually opened during the research for this document. No task is based on
> speculation alone; guesses are marked **UNVERIFIED:**. Open the cited files and verify
> the situation yourself before starting work.

---

## Level 1 — Docs / Tests (~1–2 h each)

### Task 1 · Add JSDoc to `PagePatinationInformation` (and fix the typo)

**Why it matters:** The exported `PagePatinationInformation` interface (note the typo — it
should be `PagePaginationInformation`) is part of the public `@strapi/utils` API surface but
carries no documentation comment. Contributors who encounter it in IDE autocomplete get zero
guidance on what `pageCount` means or how `page` and `pageSize` relate to the underlying
offset math.

**Files to open first**
- [`packages/core/utils/src/pagination.ts:16`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/pagination.ts#L16) — `PagePatinationInformation` interface and `OffsetPaginationInformation`
- [`packages/core/utils/src/pagination.ts:138`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/pagination.ts#L138) — `transformPagedPaginationInfo` already has a JSDoc block you can use as a style reference

**Concepts you will learn**
- How Strapi exposes pagination in REST responses (see [architecture.md §3 Request Lifecycle](./architecture.md#3-request-lifecycle))
- The offset ↔ page-based duality and the `-1` unlimited-limit sentinel

**Test command**
```bash
yarn test:unit
# To check just this package:
yarn nx test @strapi/utils
```

**Suggested commit message**
```
docs(utils): add JSDoc to pagination info interfaces and fix PagePatinationInformation typo
```

**Definition of done**
- [ ] `PagePatinationInformation` is renamed (or a correctly-spelled alias is exported) — check for consumers first with `grep -r PagePatinationInformation packages/`
- [ ] Both `PagePatinationInformation` and `OffsetPaginationInformation` have JSDoc comments explaining each field
- [ ] `transformPagedPaginationInfo` and `transformOffsetPaginationInfo` reference the interface in their `@returns` tag
- [ ] `yarn test:unit` passes with no new failures
- [ ] `yarn test:ts` passes (renaming an exported type is a breaking change if anything imports by name — verify first)

---

### Task 2 · Un-skip the `relations` controller test suite

**Why it matters:** The entire `Relations` describe block in
[`content-manager/server/src/controllers/__tests__/relations.test.ts`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/controllers/__tests__/relations.test.ts#L32)
is `describe.skip` with the comment `// TODO fix for new relations logic`.
Skipped tests give a false green in CI; any regression in the relations controller goes
undetected.

**Files to open first**
- [`packages/core/content-manager/server/src/controllers/__tests__/relations.test.ts:32`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/controllers/__tests__/relations.test.ts#L32) — the skipped suite; note it still uses `entityService` (line 44) which is deprecated
- [`packages/core/content-manager/server/src/controllers/relations.ts`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/controllers/) — the current implementation to test against
- [`target/strapi/AGENTS.md`](https://github.com/strapi/strapi/blob/develop/AGENTS.md) — confirms Entity Service is deprecated; new tests must use Document Service

**Concepts you will learn**
- Document Service vs Entity Service (see [architecture.md §6 Pitfall 2](./architecture.md#2-using-entity-service-instead-of-document-service))
- How Strapi controller tests are structured (mock `strapi`, call the handler, assert the response)

**Test command**
```bash
yarn nx test @strapi/content-manager
# or
yarn test:unit
```

**Suggested commit message**
```
test(content-manager): restore and update skipped relations controller tests for Document Service
```

**Definition of done**
- [ ] `describe.skip` removed; all assertions updated to use Document Service mocks instead of `entityService`
- [ ] The `// TODO fix for new relations logic` comment is removed
- [ ] `yarn test:unit` passes with no new failures
- [ ] No new `@ts-expect-error` or `as any` casts introduced

---

## Level 2 — Small Code Changes (~half day each)

### Task 3 · Export `asyncCurry` from root `@strapi/utils` to eliminate duplicate copies

**Why it matters:** The comment in
[`packages/core/utils/src/validate/utils.ts:3`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/validate/utils.ts#L3)
reads `// TODO: Export this from root @strapi/utils so we don't have copies of it between
packages`. `asyncCurry` is a well-tested, typed helper that every package that does async
traversal needs. Duplicating it breeds drift.

**Files to open first**
- [`packages/core/utils/src/validate/utils.ts:16`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/validate/utils.ts#L16) — the current `asyncCurry` implementation
- [`packages/core/utils/src/index.ts`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/index.ts) — check whether `asyncCurry` is already re-exported from the barrel; if not, add it
- **UNVERIFIED:** grep for other copies of `asyncCurry` across packages with `grep -r "asyncCurry" packages/` to find all duplicates that should import from `@strapi/utils` instead

**Concepts you will learn**
- Strapi's barrel-export convention (`packages/core/utils/src/index.ts` re-exports everything public)
- How TypeScript generics and currying interact (the comment on line 1 explains why lodash/fp curry was avoided)
- Monorepo dep graph: packages reference each other by pinned semver, not `workspace:*`

**Test command**
```bash
yarn test:unit
yarn test:ts
```

**Suggested commit message**
```
chore(utils): export asyncCurry from @strapi/utils public barrel and remove duplicate copies
```

**Definition of done**
- [ ] `asyncCurry` is re-exported from `packages/core/utils/src/index.ts`
- [ ] Any duplicate implementations in other packages are replaced with the import from `@strapi/utils`
- [ ] The `// TODO` comment in `validate/utils.ts` is removed
- [ ] `yarn test:ts` and `yarn test:unit` both pass

---

### Task 4 · Replace `any` in `createModelCache` with the correct UID type from `@strapi/types`

**Why it matters:** [`packages/core/utils/src/model-cache.ts:19`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/model-cache.ts#L19)
has a deliberate `// TODO should use the type from @strapi/types but this package doesn't
depend on it`, followed by `uid: any`. The `@strapi/types` package exists precisely to
share types across the monorepo; `@strapi/utils` should be able to import from it. Using
`any` for a UID silently accepts invalid inputs and bypasses IDE completion.

**Files to open first**
- [`packages/core/utils/src/model-cache.ts:17`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/src/model-cache.ts#L17) — the two `any` usages
- [`packages/core/utils/package.json`](https://github.com/strapi/strapi/blob/develop/packages/core/utils/) — check if `@strapi/types` is already a dep; if not, check how other `packages/core/` packages declare it
- [`packages/core/types/src/`](https://github.com/strapi/strapi/blob/develop/packages/core/types/) — look for a `UID.Schema` or similar type that maps to model UIDs

**Concepts you will learn**
- Monorepo type sharing pattern — `@strapi/types` is the single source of truth (see [architecture.md §2](./architecture.md#2-package-map))
- How to add a peer/dependency on another internal workspace package

**Test command**
```bash
yarn test:ts
yarn test:unit
```

**Suggested commit message**
```
fix(utils): replace `any` uid type in createModelCache with UID type from @strapi/types
```

**Definition of done**
- [ ] Both `uid: any` occurrences in `model-cache.ts` replaced with the correct type from `@strapi/types`
- [ ] The `// TODO` comment removed
- [ ] `@strapi/types` added to `packages/core/utils/package.json` dependencies if it wasn't already
- [ ] `yarn test:ts` passes; no new `@ts-expect-error` introduced

---

## Level 3 — Touches Multiple Layers (~1–2 days each)

### Task 5 · Fix `// FIXME: not needed` dead code in `data-mapper.ts` and update the mapper contract

**Why it matters:** Two functions in
[`packages/core/content-manager/server/src/services/data-mapper.ts`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/services/data-mapper.ts)
— `formatAttribute` (line 60) and `toRelation` (line 69) — carry `// FIXME: not needed` and
exist only to reformat relation attributes that the Content Manager no longer needs reformatted.
Dead code in a hot path (every content type listed in the admin calls `toContentManagerModel`)
obscures what the mapper actually does and is a trap for anyone adding a new attribute type.

**Files to open first**
- [`packages/core/content-manager/server/src/services/data-mapper.ts:40`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/services/data-mapper.ts#L40) — `formatAttributes`, `formatAttribute`, `toRelation`
- **UNVERIFIED:** search for call sites of `toContentManagerModel` with `grep -r "toContentManagerModel" packages/` to understand all consumers before removing fields
- [`packages/core/content-manager/server/src/controllers/`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/controllers/) — any controller that reads `targetModel` or `relationType` from attribute objects (the fields only `toRelation` adds) must be identified and updated

**Concepts you will learn**
- The Content Manager's server/admin split: data-mapper sits on the `strapi-server` entry point and shapes the schema objects the admin panel receives (see [architecture.md §5](./architecture.md#5-server-vs-admin-split))
- How `getVisibleAttributes`, `getTimestamps`, and `getCreatorFields` work together to build the attribute list
- Why morph relations are skipped (line 50 comment) — context for the polymorphic relations work tracked in [architecture.md §1](./architecture.md#1-strapi-in-one-paragraph)

**Test command**
```bash
yarn nx test @strapi/content-manager
yarn test:unit
# After verifying no admin-side breakage:
yarn test:front
```

**Suggested commit message**
```
fix(content-manager): remove dead formatAttribute/toRelation wrappers from data-mapper service
```

**Definition of done**
- [ ] `formatAttribute` and `toRelation` are deleted
- [ ] `formatAttributes` calls `acc[key] = attribute` directly (or the reduce is simplified further)
- [ ] No consumer reads `targetModel` or `relationType` from the mapper output (grepped and confirmed)
- [ ] `yarn test:unit`, `yarn test:front`, and `yarn test:ts` all pass

---

### Task 6 · Add a `// TODO: Handle nested components` implementation to history lifecycle `getSchemas`

**Why it matters:** [`packages/core/content-manager/server/src/history/services/lifecycles.ts:67`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/history/services/lifecycles.ts#L67)
builds the schema snapshot stored with each history version but only walks one level of
components — it does not recurse into components that themselves contain nested components.
When a user restores an entry whose nested component schemas have changed since the snapshot
was taken, the restore logic cannot accurately flag which nested fields are incompatible,
potentially surfacing misleading "this field cannot be restored" errors or silently ignoring
changed inner components.

**Files to open first**
- [`packages/core/content-manager/server/src/history/services/lifecycles.ts:64`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/history/services/lifecycles.ts#L64) — `getSchemas`; the `// TODO: Handle nested components` comment is at line 67
- [`packages/core/content-manager/server/src/history/services/utils.ts:213`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/history/services/utils.ts#L213) — a parallel `// TODO: Support polymorphic relations` in the restore path; understand what the utils file already does so your recursion matches its shape
- [`packages/core/content-manager/server/src/history/models/history-version.ts`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/server/src/history/models/history-version.ts) — the `CreateHistoryVersion` type including `componentsSchemas`; understand the expected shape before writing the recursive collector

**Concepts you will learn**
- Strapi's document lifecycle middleware pattern (history hooks attach as Document Service middleware — see [architecture.md §3](./architecture.md#3-request-lifecycle))
- How `strapi.getModel(uid)` resolves component schemas (relevant to [architecture.md §5 Pitfall 5](./architecture.md#5-accessing-services-before-isloaded-is-true))
- The CE/EE split for History: the history directory lives under `server/src/history/` which is CE code; the EE history extensions are under `ee/` — keep changes in CE only

**Test command**
```bash
yarn nx test @strapi/content-manager
yarn test:unit
# Integration test to confirm history versioning end-to-end:
yarn test:api
```

**Suggested commit message**
```
fix(content-manager): recurse into nested components when collecting history version schemas
```

**Definition of done**
- [ ] `getSchemas` recursively collects schemas for components nested inside other components (not just top-level)
- [ ] The recursion is protected against circular component references (e.g. with a `visited` `Set<string>`)
- [ ] The `// TODO: Handle nested components` comment is removed
- [ ] A unit test covers the two-level nesting case: `contentType → componentA → componentB`
- [ ] `yarn test:unit` and `yarn test:ts` pass; `yarn test:api` passes if you can run it locally

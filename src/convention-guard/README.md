# convention-guard

A zero-dependency Node.js CLI tool that checks contributor changes against the [Strapi contribution rules](../../target/strapi/AGENTS.md).

## Usage

### Without git (recommended for non-git scenarios)

```bash
node src/convention-guard/index.js \
  --files packages/foo/src/index.ts packages/bar/src/utils.ts \
  --commit "feat(admin): add bulk delete"
```

### With git (auto-detects changed files)

```bash
node src/convention-guard/index.js \
  --repo ./path/to/strapi \
  --base develop \
  --commit "fix: correct locale handling"
```

If `--repo` points to a directory that is **not** a git repository, a friendly message is shown and the tool exits with code 1 — it will not crash.

### JSON output

```bash
node src/convention-guard/index.js --files src/foo.ts --json
```

### Help

```bash
node src/convention-guard/index.js --help
```

## Options

| Flag | Description |
|------|-------------|
| `--files <paths...>` | One or more file paths to lint |
| `--commit "<msg>"` | Commit message to validate |
| `--repo <path>` | Path to a git repo (uses `git diff --name-only`) |
| `--base <branch>` | Base branch for `--repo` mode (default: `develop`) |
| `--json` | Emit machine-readable JSON |
| `--help` | Show usage |

## Rules

| ID | Severity | Description |
|----|----------|-------------|
| `no-global-strapi` | error | `global.strapi` usage — use DI instead |
| `no-entity-service` | error | `strapi.entityService` is deprecated — use `strapi.documents` |
| `conventional-commit` | error | Commit message must follow Conventional Commits |
| `no-explicit-any` | warning | `: any` / `as any` in `.ts`/`.tsx` files |
| `no-raw-sql-interpolation` | warning | Template literal SQL interpolation inside raw query calls |
| `examples-folder-touched` | warning | Files inside `examples/` (except `examples/complex`) |

### Skipped paths

By default these are always skipped:
- Any path containing `/ee/`
- Any path containing `__tests__`

## Example report

```
no-global-strapi [error]
  Why: Use of global.strapi bypasses dependency injection and breaks modularity.
  Fix: Receive `strapi` as a parameter via the factory pattern instead.

  packages/plugins/documentation/server/src/utils.ts:7
  → { strapi: global.strapi }

conventional-commit [error]
  Why: Commit messages must follow Conventional Commits to keep the changelog clean.
  Fix: Use format `type(scope): description` where type is one of: chore, ci, docs, …

  (commit message)
  → added new feature
    "added new feature" does not follow the `type(scope): description` format.

Found: 2 errors, 3 warnings
```

## Running tests

```bash
node --test src/convention-guard/__tests__/rules.test.js
```

## Project structure

```
src/convention-guard/
├── index.js          # CLI entry point
├── runner.js         # Loads rules, reads files, collects results
├── reporter.js       # Terminal + JSON formatters
├── rules/
│   ├── no-global-strapi.js
│   ├── no-entity-service.js
│   ├── conventional-commit.js
│   ├── no-explicit-any.js
│   ├── no-raw-sql-interpolation.js
│   └── examples-folder-touched.js
└── __tests__/
    ├── rules.test.js
    └── fixtures/     # Small pass/fail fixture files per rule
```

# Strapi Monorepo — Beginner's Local Setup Guide

> **Target audience:** First-time contributors who have never worked with the Strapi monorepo.
> All commands are run from the repo root unless stated otherwise.

---

## ⚠️ Docs vs config mismatch — Node version

Three sources in this repo give three different answers for the required Node.js version:

| Source | Value |
|---|---|
| `AGENTS.md` | `Node ≥22 ≤26` |
| `package.json` `"engines"` | `>=20.0.0 <=26.x.x` |
| `examples/getstarted/package.json` `"engines"` | `>=20.0.0 <=26.x.x` |
| `.nvmrc` | `20` |
| `CONTRIBUTING.md` | `>= v22 and <= v26` |

**What this means for you:** `.nvmrc` pins `20`, which is the version `nvm use` will install
automatically. The two `package.json` engine fields both allow `>=20`, so Node 20 will not be
rejected by Yarn at install time. But `AGENTS.md` and `CONTRIBUTING.md` say the *floor* is 22,
implying Node 20 may expose bugs in practice.

**Safest recommendation for a newcomer: use Node 22 LTS.**

- It satisfies the `>=20` engine constraint (Yarn will not error).
- It satisfies the `>=22` floor stated in `AGENTS.md` and `CONTRIBUTING.md`.
- It is within the `<=26` ceiling in every source.
- It is an LTS release, meaning it receives long-term security backports.

Node 20 *may* work because of the `>=20` engine field, but you risk hitting behaviour that the
core team does not test against. Node 24+ is also fine but less battle-tested. Stick with 22 LTS
unless you have a specific reason to deviate.

> ⚠️ **Yarn mismatch too:** CONTRIBUTING.md (line 55) says "Yarn at v1.2.0+", but `package.json` pins `"packageManager": "yarn@4.12.0"`. Installing Yarn 1 will fail — run `corepack enable` so the correct Yarn 4 is used automatically.

---

## 1. Prerequisites checklist

Install every item in the table before running any repo commands.

| Tool | Required version | How to verify | Notes |
|---|---|---|---|
| **Node.js** | `>=22.0.0 <=26.x.x` | `node --version` | Use Node 22 LTS (see mismatch note above). Install via [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schrollmops/fnm). |
| **Corepack** | bundled with Node ≥16 | `corepack --version` | Enable it once with `corepack enable` — this makes Yarn 4 available without a global install. |
| **Yarn** | `4.12.0` (exact, via Corepack) | `yarn --version` | Do **not** install Yarn via npm. After `corepack enable`, Yarn is managed by Corepack automatically. |
| **Git** | any recent version | `git --version` | Needed for cloning and Husky hooks. |
| **Docker** *(optional)* | any recent version | `docker --version` | Only required if you want to run Postgres or MySQL locally. SQLite works with no Docker at all. |

### Quick verification block

```bash
node --version      # must print v22.x.x (or v23–v26)
corepack --version  # must print a version number
yarn --version      # must print 4.12.0
git --version       # any version is fine
docker --version    # optional — skip if not installed
```

### Enable Yarn 4 via Corepack (do this once)

```bash
corepack enable
```

Corepack reads the `"packageManager": "yarn@4.12.0"` field in `package.json` and routes `yarn`
commands to that exact version automatically. You do not need to install anything else.

---

## 2. Step-by-step first run

### Step 1 — Fork and clone

```bash
# Fork the repo on GitHub first, then:
git clone git@github.com:YOUR_USERNAME/strapi.git
cd strapi
```

*Clones your fork locally. Always branch from `develop` — never `main`.*

```bash
git checkout develop
git checkout -b feat/your-branch-name
```

### Step 2 — Install dependencies

```bash
yarn install
```

*Installs all workspace packages across the monorepo using Yarn 4 workspaces. First run takes
1–3 minutes depending on your internet connection and cache state.*

### Step 3 — Full build (the slow step)

```bash
yarn setup
```

*Runs `yarn install`, then `yarn clean` (removes all `dist/` artefacts), then
`yarn build --skip-nx-cache` (compiles every package's TypeScript and generates `.d.ts` files
from scratch), and finally runs the post-setup AI tooling sync script.
**Expect this to take 5–15 minutes** on a modern laptop — it is building every package cold.
You only need to run this once after cloning, or after a large pull that changes many packages.*

### Step 4 — Sync AI skill links (recommended)

```bash
yarn ai:sync
```

*Creates symlinks from `.ai/skills/` into `.agents/`, `.claude/`, and `.cursor/` so that AI
coding tools can find repo-specific skills. This is a no-op if you don't use those tools.*

### Step 5 — Start the dev sandbox with SQLite

```bash
cd examples/getstarted
yarn develop
```

*Starts the `getstarted` example application using SQLite (the default — no database setup
needed). The admin panel will be available at `http://localhost:1337/admin`.*

First run will ask you to create an admin user. This is normal.

> **Note:** `examples/` apps are sandboxes only. Use them to reproduce and test your changes.
> Do not commit changes to example files unless you are specifically asked to.

---

## 3. Which DB should I use?

| Database | When to use it | How to start |
|---|---|---|
| **SQLite** (default) | All unit tests, frontend tests, type checks, and most local dev. Zero configuration. | Nothing — just `yarn develop` in `examples/getstarted`. |
| **PostgreSQL** | API integration tests targeting Postgres-specific behaviour, or when your change touches SQL dialect differences. | `docker-compose -f docker-compose.dev.yml up -d postgres` then `DB=postgres yarn develop` |
| **MySQL** | API integration tests targeting MySQL-specific behaviour. | `docker-compose -f docker-compose.dev.yml up -d mysql` then `DB=mysql yarn develop` |

### Docker DB credentials (from `docker-compose.dev.yml`)

| Field | Value |
|---|---|
| Host | `localhost` |
| Port | `5432` (Postgres) / `3306` (MySQL) |
| Database | `strapi` |
| User | `strapi` |
| Password | `strapi` |

### Starting all databases at once

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Stopping them

```bash
docker-compose -f docker-compose.dev.yml down
```

---

## 4. Which test do I run?

Run the narrowest suite that covers your change first, then broaden before opening a PR.

| Kind of change | Run first | Run before PR |
|---|---|---|
| Backend service / core logic (`packages/core/`) | `yarn test:unit` | + `yarn test:ts` |
| Admin UI / React components (`packages/core/admin`, `packages/plugins/`) | `yarn test:front` (EE) or `yarn test:front:ce` (CE only) | + `yarn test:ts` |
| API behaviour / REST endpoints | `yarn test:api` (SQLite) | `yarn test:api --db=postgres`, `yarn test:api --db=mysql` |
| CLI tools (`packages/cli/`) | `yarn test:cli` | `yarn test:cli:debug` |
| TypeScript types (`@strapi/types`) | `yarn test:ts` | `yarn test:ts` |
| Any change at all | `yarn lint && yarn prettier:check` | Full pre-PR suite (see §6) |

### Regenerate the test app before API tests

API integration tests need a freshly generated test app — a stale one causes misleading failures:

```bash
yarn test:generate-app         # SQLite (default)
yarn test:generate-app --db=postgres
yarn test:generate-app --db=mysql
```

### Watch modes (for iterative dev)

```bash
yarn test:unit:watch           # re-runs unit tests on file change
yarn test:front:watch          # re-runs frontend tests on file change
```

---

## 5. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `error This version of Node.js is not supported` or Yarn refuses to install | Node version outside `>=20 <=26` | Run `nvm install 22 && nvm use 22`, verify with `node --version`, then retry. |
| `yarn: command not found` or `yarn --version` shows `1.x` | Corepack not enabled, or old global Yarn is shadowing it | Run `corepack enable`, then open a new shell and check `yarn --version` again. |
| `Cannot find module '…/dist/…'` after pulling from `develop` | Stale build — new code landed but `dist/` has not been rebuilt | Run `yarn setup` from the repo root to do a clean rebuild. |
| API tests fail with schema or migration errors | Stale test app was reused | Delete the test app directory (UNVERIFIED: typically `.test-app/`) and run `yarn test:generate-app` before retrying. |
| `Error: listen EADDRINUSE :::1337` | Port 1337 already in use (previous `yarn develop` still running or another process) | Kill the process: `lsof -ti:1337 \| xargs kill -9`, then restart. |
| `ECONNREFUSED` connecting to Postgres or MySQL | Docker container is not running | Run `docker-compose -f docker-compose.dev.yml up -d`, then check `docker ps`. |
| `yarn ai:sync` links are missing / `.agents/skills/` is empty | `yarn setup` was interrupted or you skipped `yarn ai:sync` | Run `yarn ai:sync` from the repo root; it is idempotent and safe to re-run. |
| `commitlint` rejects your commit message | Commit message does not follow Conventional Commits format | Use `yarn commit` for an interactive prompt, or fix the message manually: `type(scope): description`. Valid types: `feat fix chore ci docs enhancement test revert security future release`. |
| `yarn lint` fails with many errors after a big rebase | Prettier or ESLint violations from merged upstream changes | Run `yarn lint:fix && yarn format` to auto-fix what can be fixed, then review remaining issues. |
| `yarn test:ts` fails with `Cannot find type …` | `@strapi/types` was changed but your package still imports the old shape | Run `yarn build:types` to regenerate `.d.ts` files, then retry `yarn test:ts`. |
| E2E tests fail with `browserType.launch: Executable doesn't exist` | Playwright browsers not installed | Run `yarn playwright install` once, then retry. |

---

## 6. Pre-PR checklist

The following is derived from `AGENTS.md`. Work through every item before opening a pull request.

### Mandatory test suite

```bash
yarn test:unit && yarn test:front && yarn test:ts && yarn lint && yarn prettier:check
```

Run this from the repo root. All five commands must exit with no errors.

| Check | What it does | Why it matters |
|---|---|---|
| `yarn test:unit` | Runs Vitest/Jest unit tests for every package. | Catches logic regressions in backend services and utilities. |
| `yarn test:front` | Runs Jest frontend tests with `IS_EE=true` (Enterprise features on). | Catches React component and admin UI regressions. |
| `yarn test:ts` | Type-checks all packages front and back. | Strapi uses TypeScript throughout — type errors are real bugs. |
| `yarn lint` | Runs ESLint across all packages. | Enforces code style and catches common anti-patterns. |
| `yarn prettier:check` | Verifies formatting (2-space indent, single quotes, semicolons, LF). | Diff noise from formatting causes review friction. |

### E2E tests (slow — enforced by CI)

```bash
yarn playwright install          # only needed once
yarn test:e2e --setup --concurrency=1
```

E2E tests exercise the full running application via a real browser. They are slow (15–30 min),
so running them locally is optional — but CI will run them on your PR and block merge if they
fail. If you changed admin UI flows, run them locally to avoid surprise CI failures.

### Branch and commit hygiene

- [ ] Branch created from `develop` (not `main`)
- [ ] PR targets `develop` (not `main`)
- [ ] Every commit follows Conventional Commits — use `yarn commit` if unsure
- [ ] If you touched any `package.json`, run `yarn version:check`
- [ ] PR description follows the repo's pull request template (`.github/PULL_REQUEST_TEMPLATE.md`)
- [ ] Existing issue linked in the PR description

### Tests for your change

- **Bug fix:** Add a test that reproduces the bug *before* your fix, confirm it fails, then confirm your fix makes it pass.
- **New feature:** Add tests that cover meaningful behaviour — not just coverage numbers.
- **Changed behaviour:** Update affected tests to match the new expected output.

### Security reminders

- Do **not** commit secrets, credentials, or API keys.
- Do **not** disable or weaken authentication/authorization checks.
- Use parameterized queries — never interpolate user input into raw SQL.
- Validate and sanitize all user input at controller/service boundaries.

---

## Quick-reference card

```bash
# One-time setup
corepack enable
git clone git@github.com:YOUR_USERNAME/strapi.git && cd strapi
yarn install
yarn setup          # slow — 5-15 min
yarn ai:sync

# Daily dev (SQLite)
cd examples/getstarted && yarn develop

# Daily dev (Postgres)
docker-compose -f docker-compose.dev.yml up -d postgres
cd examples/getstarted && DB=postgres yarn develop

# Run tests
yarn test:unit
yarn test:front
yarn test:ts
yarn test:api

# Before every PR
yarn test:unit && yarn test:front && yarn test:ts && yarn lint && yarn prettier:check

# Commit
yarn commit         # interactive prompt
```

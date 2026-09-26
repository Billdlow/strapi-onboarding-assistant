# Strapi Onboarding Assistant

An onboarding assistant for new contributors to the [Strapi](https://github.com/strapi/strapi) monorepo, built with [IBM Bob](https://www.ibm.com/products/bob). It maps the full request pipeline for four key features, reconciles conflicting Node-version sources, curates ready-to-attempt starter tasks, and ships a convention-guard CLI — so a newcomer can orient themselves in minutes instead of days. The approach is repo-agnostic: Strapi is the demo target, but the same workflow applies to any large open-source monorepo.

---

## Setup

Before using the `check` command or verifying any file:line references, clone the target repo:

```bash
git clone --depth 1 https://github.com/strapi/strapi.git target/strapi
```

Then open the interactive menu:

```bash
node src/onboard.js
```

No `npm install` needed — the CLI has zero external dependencies.

---

## Quickstart

```bash
# 1. Clone and enter this repo
git clone <this-repo> && cd strapi-onboarding-assistant

# 2. Clone the target (needed by `check` and for file:line references)
git clone --depth 1 https://github.com/strapi/strapi.git target/strapi

# 3. Check your environment
node src/onboard.js setup

# 4. Open the interactive menu
node src/onboard.js
```

---

## Usage

```
node src/onboard.js [command] [args]
```

Running with **no arguments** opens an interactive menu that lets you pick
any command.

### Commands

| Command            | Description                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `architecture`     | Print `outputs/architecture.md` — monorepo layout, request lifecycle, app lifecycle, and common pitfalls.                                                      |
| `trace <feature>`  | Print the named feature trace. `feature` is one of `publish`, `login`, `create-content-type`, `upload`. Omit the argument to print `outputs/feature-index.md`. |
| `learn <role>`     | Print the learning path for `backend`, `frontend`, or `plugin` contributors. Omit the argument to print all paths.                                             |
| `quiz`             | Run `outputs/quiz.md` interactively — asks each question, accepts your answer, shows the explanation, then reports a final score.                              |
| `impact`           | Print `outputs/impact.md`.                                                                                                                                     |
| `setup`            | Run `scripts/setup-doctor.sh` to check your local environment, then print the first-run setup steps from `outputs/setup-guide.md`.                             |
| `tasks [level]`    | Print starter tasks from `outputs/starter-tasks.md`. Pass `1`, `2`, or `3` to filter by difficulty level.                                                      |
| `check [files...]` | Run `src/convention-guard` against the listed files. With no arguments, print the recorded demo from `outputs/convention-guard-demo.txt`.                      |

### Examples

```bash
# Read the architecture overview
node src/onboard.js architecture

# Walk the publish feature trace
node src/onboard.js trace publish

# Show starter tasks for level 1 only
node src/onboard.js tasks 1

# Show the backend contributor learning path
node src/onboard.js learn backend

# Take the quiz
node src/onboard.js quiz

# Check a file for convention violations
node src/onboard.js check target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts

# Run the convention-guard demo (no files needed)
node src/onboard.js check
```

---

## How IBM Bob built this

Ten focused Bob sessions produced every artefact in this project. Task 07 used **Orchestrator mode with 3 parallel subtasks** to produce the login, create-content-type, and upload traces simultaneously. Task 08 created the custom **"Strapi Onboarding Buddy"** persona, defined in [`.bob/custom_modes.yaml`](.bob/custom_modes.yaml).

| #     | What it produced                                                                                                                                                                                 | Session log                                                                                |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 01–02 | Architecture overview (`outputs/architecture.md`) + publish feature trace (`outputs/trace-publish.md`) — package map, request lifecycle, app lifecycle, common pitfalls, full publish call chain | [`cc_task01-02_…_log.md`](bob_sessions/cc_task01-02_architecture_and_publish_trace_log.md) |
| 03    | Setup guide (`outputs/setup-guide.md`) — Node/Yarn version matrix, first-run walkthrough, troubleshooting table                                                                                  | [`cc_task03_…_log.md`](bob_sessions/cc_task03_setup_guide_log.md)                          |
| 04    | Convention Guard CLI (`src/convention-guard/`) — 6 static-analysis rules, 22 unit tests, reporter                                                                                                | [`cc_task04_…_log.md`](bob_sessions/cc_task04_convention_guard_log.md)                     |
| 05    | Starter tasks (`outputs/starter-tasks.md`) — 9 curated Level 1/2/3 contribution tasks with file citations                                                                                        | [`cc_task05_…_log.md`](bob_sessions/cc_task05_starter_tasks_log.md)                        |
| 06    | Onboarding CLI (`src/onboard.js`) — interactive entry point with 8 commands                                                                                                                      | [`cc_task06_…_log.md`](bob_sessions/cc_task06_onboarding_cli_log.md)                       |
| 07    | Parallel feature traces — login, create-content-type, upload + feature index (`outputs/trace-*.md`) — produced via **Orchestrator mode, 3 parallel subtasks**                                    | [`cc_task07_…_log.md`](bob_sessions/cc_task07_parallel_feature_traces_log.md)              |
| 08    | Custom Bob mode — **Strapi Onboarding Buddy** persona in [`.bob/custom_modes.yaml`](.bob/custom_modes.yaml) with demo Q&A                                                                        | [`cc_task08_…_log.md`](bob_sessions/cc_task08_custom_mode_log.md)                          |
| 09    | Learning paths + quiz + impact (`outputs/learning-paths.md`, `outputs/quiz.md`, `outputs/impact.md`) — structured 3-day paths, 10-question quiz, impact table                                    | [`cc_task09_…_log.md`](bob_sessions/cc_task09_learning_paths_log.md)                       |
| 10    | Web portal (`index.html`) — static SPA with sidebar nav, Mermaid diagrams, quiz UI, convention-guard demo                                                                                        | [`cc_task10_…_log.md`](bob_sessions/cc_task10_web_portal_log.md)                           |
| 11    | Final fixes — Mermaid error handling, Yarn mismatch note, CLI exit codes, README                                                                                                                 | [`cc_task11_…_log.md`](bob_sessions/cc_task11_final_fixes_log.md)                          |

---

## Web portal

`index.html` at the repo root is a static single-file portal that loads the `outputs/` docs at runtime using `fetch()`.

### Local preview

> **Note:** browsers block `fetch()` on `file://` URLs. Serve over HTTP:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

### GitHub Pages

Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save.  
No build step required — the portal is served directly from the repository root.

---

## Testing

```bash
node --test src/convention-guard/__tests__/*.js
```

All **22/22 tests pass**.

---

## Project layout

```
outputs/           All generated documentation (architecture, traces, paths, quiz…)
scripts/           Helper shell scripts (setup-doctor.sh)
src/
  onboard.js       CLI entry point (no external dependencies)
  convention-guard/ Static analysis tool for Strapi coding conventions
.bob/
  custom_modes.yaml  Strapi Onboarding Buddy custom mode definition
bob_sessions/      IBM Bob conversation logs and session summaries (Tasks 01–10)
```

---

## Key findings

- **4 conflicting Node version sources** across `AGENTS.md`, `package.json`, `.nvmrc`, and `CONTRIBUTING.md` — plus a Yarn docs-vs-config mismatch (CONTRIBUTING.md says "v1.2.0+"; `package.json` pins `yarn@4.12.0`). See [`outputs/setup-guide.md`](outputs/setup-guide.md) for the full analysis.
- **`eventHub`** is the common extension point in three of the four traced features (publish → `entry.publish`, create-content-type → `content-type.create`, upload → `media.create`) — plugins hook into it without modifying core code. Login does not emit an event.

---

## Impact

The assistant reduces time-to-orientation from hours to minutes. Full analysis in [`outputs/impact.md`](outputs/impact.md).

Highlights: finding the publish logic drops from 4–8 h (manual monorepo spelunking) to ~5 min with `trace-publish.md` (~55–90× speedup); understanding the app lifecycle drops from 1–3 h to ~8 min (~10–22×).

---

## Data sources & license

This project analysed the public [strapi/strapi](https://github.com/strapi/strapi) repository (`develop` branch). The Strapi Community Edition is MIT licensed. Directories named `ee/` (Enterprise Edition, subject to a different license) were excluded from all analysis. No personal, client, or confidential data was used.

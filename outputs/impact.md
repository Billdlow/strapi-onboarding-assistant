# Strapi Onboarding Assistant — Impact Assessment

> Comparing "without the assistant" to "with the assistant" for five key onboarding activities.
>
> **"With" times** are derived from the word counts of the relevant `outputs/` documents at a
> reading speed of ~200 words/minute (a comfortable technical reading pace).
>
> **"Without" times** are clearly labelled as **estimates**. The assumption behind each
> estimate is stated explicitly in the "Assumption" column.
>
> All "with" doc lengths were measured with `wc -w` on the files in `outputs/`.

---

## Impact Table

| Activity | Without the assistant | Assumption (without) | With the assistant | Relevant doc(s) | Words in docs | Speedup |
|---|---|---|---|---|---|---|
| **1. Finding the publish logic** | **4–8 h (est.)** | A developer unfamiliar with the ~4 000-file monorepo manually follows `POST /content-manager/…/publish` through route → policies → controller → service → Document Service → `entries.ts`, opening each file cold and re-reading surrounding context at each hop. The `trace-publish.md` "Time Saved" section cites this range. | **~5 min** | [`trace-publish.md`](./trace-publish.md) | 1 056 words → 5.3 min | **~55–90×** |
| **2. Understanding app lifecycle** | **1–3 h (est.)** | A newcomer reads the full `Strapi.ts` source (~600 lines) to reconstruct the Register / Bootstrap / Start / Destroy order, cross-referencing multiple loader files and the DI container to understand what is available at each phase. | **~8 min** | [`architecture.md`](./architecture.md) §4 App Lifecycle + §6 Pitfall 5 (~300 words of those sections) | ~300 words → 1.5 min focused; full doc = 1 101 words → 5.5 min | **~10–22×** |
| **3. Getting a working local setup** | **2–4 h (est.)** | A newcomer reads `CONTRIBUTING.md`, `.nvmrc`, `package.json` engines, and `AGENTS.md` to reconcile conflicting Node version requirements, then discovers the Corepack/Yarn 4 requirement, `yarn setup`'s duration, and the SQLite dev sandbox by trial and error or by searching GitHub issues. | **~10 min** | [`setup-guide.md`](./setup-guide.md) | 2 003 words → 10 min | **~12–24×** |
| **4. Choosing a first task** | **3–6 h (est.)** | A newcomer browses GitHub issues labelled `good first issue`, reads several that turn out to require deep context, eventually picks one without knowing which files are involved or what tests to run. Many good-first-issue labels are stale. | **~8 min** | [`starter-tasks.md`](./starter-tasks.md) | 1 596 words → 8 min | **~22–45×** |
| **5. Passing commit / PR conventions** | **30–90 min (est.)** | A newcomer writes a commit, gets rejected by `commitlint`, reads the Conventional Commits spec to understand valid types, then reads `.github/PULL_REQUEST_TEMPLATE.md` and `CONTRIBUTING.md` to understand the PR checklist; may need a second read after a first PR is sent back. | **~5 min** | [`setup-guide.md`](./setup-guide.md) §6 Pre-PR checklist (~500 words of that section) | ~500 words → 2.5 min focused; full doc = 2 003 words → 10 min | **~6–18×** |

---

## Notes on methodology

### Reading-speed baseline
200 words/minute is a standard estimate for technical prose with code blocks. Readers who
skim headers and focus on tables may be faster; readers who stop to verify every code
citation may be slower. The word counts above come from `wc -w` on the actual files.

### "Without" estimates are lower bounds
The "without" times assume a competent developer who knows how to grep and navigate a large
Node.js monorepo. A developer who is also new to Koa, Knex, Yarn workspaces, or TypeScript
monorepos would take longer. The estimates do **not** include time lost to wrong turns, stale
documentation, or waiting for `yarn setup` to finish after a bad Node version.

### "With" times assume all docs are pre-generated
The "with" column assumes the `outputs/` docs already exist. The time to generate them
(running the onboarding assistant) is a one-time cost amortised across all new contributors.

### Speedup is an order-of-magnitude figure
The ×-speedup column uses the midpoint of the "without" range divided by the "with" reading
time. It is intentionally approximate — the goal is to convey the order of magnitude, not a
precise measurement.

---

## Total first-week time comparison

| | Without the assistant | With the assistant |
|---|---|---|
| Sum of all five activities | **10.5–21.5 h (est.)** | **~36 min** |
| Remaining time for actual coding | ~18.5–29.5 h of a 40 h week | ~39.5 h of a 40 h week |

> **Interpretation:** A new contributor using the assistant can spend the time they save on
> their first actual contribution rather than on orientation. At the midpoint, the assistant
> saves roughly **~15 hours** in the first week alone.

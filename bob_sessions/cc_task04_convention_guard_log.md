# Build a small Node.js CLI tool called "convention-guard" in src/convention-guard/ that checks a contributor's changes against the Strapi contribution rules in target/strapi/AGENTS.md.

Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts first to extract the rules. Do not read other Strapi files unless listed below.

Note: target/strapi was downloaded as a zip, so it is NOT a git repository. Design for that.
Requirements:
- Main usage (works without git): `node src/convention-guard/index.js --files <paths...> [--commit "<message>"]`
- Optional git mode: `--repo <path> --base develop` uses git diff --name-only and git log -1. If the path is not a git repo, print a friendly message and suggest --files instead of crashing.
- Rules to implement (each rule = its own small module with id, description, check function, and fix hint):1. no-global-strapi: flags `global.strapi` usage. Allowlist the files that legitimately define it: packages/core/core/src/Strapi.ts and packages/core/core/src/index.ts.
  2. no-entity-service: flags `strapi.entityService` / `entityService.` usage (deprecated → use strapi.documents). Allowlist type definitions (packages/core/types/**) and upgrade codemods (packages/utils/upgrade/**).
  3. conventional-commit: validates the --commit message. Types must come from .commitlintrc.ts (chore, ci, docs, enhancement, feat, fix, release, revert, security, test, future). Also honour its ignore rule for "Merge branch '...' into ..." messages.4. no-explicit-any: flags `: any` / `as any` in .ts/.tsx files (warning only, and only in files passed in, since the repo has many existing uses).
  5. no-raw-sql-interpolation: flags template literals containing SQL keywords inside raw query calls (warning).
  6. examples-folder-touched: warns if passed files are under examples/ (except examples/complex).
- Skip any path containing /ee/ and any __tests__ folder by default.
- Output: a readable terminal report grouped by rule, with file:line, severity (error/warning), a one-line "why this rule exists" explanation for newcomers, and the fix hint. Exit code 1 if any error.
- Also support `--json` output.- No external dependencies except Node built-ins.
- Add tests in src/convention-guard/__tests__/ using node:test with small fixture files (one passing, one failing per rule).
- Add a short src/convention-guard/README.md with usage and an example report.

Run the tests and show me the result. Do not claim tests pass unless you ran them.

Finally, run a real demo against Strapi and save the report to outputs/convention-guard-demo.txt:
node src/convention-guard/index.js --files target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts target/strapi/packages/plugins/documentation/server/src/utils.ts target/strapi/packages/core/core/src/Strapi.ts --commit "added new feature"
Expected: real findings in the first two files, Strapi.ts allowlisted (no global.strapi error), and the commit message rejected. If the output differs, explain why.

---

**Status:** active  **Date:** 2026-09-26

---

### 👤 User

Build a small Node.js CLI tool called "convention-guard" in src/convention-guard/ that checks a contributor's changes against the Strapi contribution rules in target/strapi/AGENTS.md.

Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts first to extract the rules. Do not read other Strapi files unless listed below.

Note: target/strapi was downloaded as a zip, so it is NOT a git repository. Design for that.
Requirements:
- Main usage (works without git): `node src/convention-guard/index.js --files <paths...> [--commit "<message>"]`
- Optional git mode: `--repo <path> --base develop` uses git diff --name-only and git log -1. If the path is not a git repo, print a friendly message and suggest --files instead of crashing.
- Rules to implement (each rule = its own small module with id, description, check function, and fix hint):1. no-global-strapi: flags `global.strapi` usage. Allowlist the files that legitimately define it: packages/core/core/src/Strapi.ts and packages/core/core/src/index.ts.
  2. no-entity-service: flags `strapi.entityService` / `entityService.` usage (deprecated → use strapi.documents). Allowlist type definitions (packages/core/types/**) and upgrade codemods (packages/utils/upgrade/**).
  3. conventional-commit: validates the --commit message. Types must come from .commitlintrc.ts (chore, ci, docs, enhancement, feat, fix, release, revert, security, test, future). Also honour its ignore rule for "Merge branch '...' into ..." messages.4. no-explicit-any: flags `: any` / `as any` in .ts/.tsx files (warning only, and only in files passed in, since the repo has many existing uses).
  5. no-raw-sql-interpolation: flags template literals containing SQL keywords inside raw query calls (warning).
  6. examples-folder-touched: warns if passed files are under examples/ (except examples/complex).
- Skip any path containing /ee/ and any __tests__ folder by default.
- Output: a readable terminal report grouped by rule, with file:line, severity (error/warning), a one-line "why this rule exists" explanation for newcomers, and the fix hint. Exit code 1 if any error.
- Also support `--json` output.- No external dependencies except Node built-ins.
- Add tests in src/convention-guard/__tests__/ using node:test with small fixture files (one passing, one failing per rule).
- Add a short src/convention-guard/README.md with usage and an example report.

Run the tests and show me the result. Do not claim tests pass unless you ran them.

Finally, run a real demo against Strapi and save the report to outputs/convention-guard-demo.txt:
node src/convention-guard/index.js --files target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts target/strapi/packages/plugins/documentation/server/src/utils.ts target/strapi/packages/core/core/src/Strapi.ts --commit "added new feature"
Expected: real findings in the first two files, Strapi.ts allowlisted (no global.strapi error), and the commit message rejected. If the output differs, explain why.

---

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[-] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[ ] Design the module structure for convention-guard
[ ] Implement core CLI (index.js, runner, reporter)
[ ] Implement rule: no-global-strapi
[ ] Implement rule: no-entity-service
[ ] Implement rule: conventional-commit
[ ] Implement rule: no-explicit-any
[ ] Implement rule: no-raw-sql-interpolation
[ ] Implement rule: examples-folder-touched
[ ] Write tests in src/convention-guard/__tests__/
[ ] Write src/convention-guard/README.md
[ ] Run tests and show results
[ ] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

> 🔧 called: read_file, read_file



> 🔧 **read_file** — target/strapi/AGENTS.md

> 🔧 **read_file** — target/strapi/.commitlintrc.ts

### 🤖 Assistant

> 🔧 called: read_file, read_file, read_file

Now let me check the demo target files to understand what findings to expect:

> 🔧 **read_file** — target/strapi/packages/core/core/src/Strapi.ts

> 🔧 **read_file** — target/strapi/packages/plugins/documentation/server/src/utils.ts

> 🔧 **read_file** — target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts

### 🤖 Assistant

> 🔧 called: grep, grep



> 🔧 **grep** — global\.strapi

> 🔧 **grep** — global\.strapi

### 🤖 Assistant

> 🔧 called: update_todo_list

Now I have everything I need. Let me build all the files:

> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[-] Design the module structure for convention-guard
[ ] Implement core CLI (index.js, runner, reporter)
[ ] Implement rule: no-global-strapi
[ ] Implement rule: no-entity-service
[ ] Implement rule: conventional-commit
[ ] Implement rule: no-explicit-any
[ ] Implement rule: no-raw-sql-interpolation
[ ] Implement rule: examples-folder-touched
[ ] Write tests in src/convention-guard/__tests__/
[ ] Write src/convention-guard/README.md
[ ] Run tests and show results
[ ] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[x] Design the module structure for convention-guard
[-] Implement core CLI (index.js, runner, reporter)
[ ] Implement rule: no-global-strapi
[ ] Implement rule: no-entity-service
[ ] Implement rule: conventional-commit
[ ] Implement rule: no-explicit-any
[ ] Implement rule: no-raw-sql-interpolation
[ ] Implement rule: examples-folder-touched
[ ] Write tests in src/convention-guard/__tests__/
[ ] Write src/convention-guard/README.md
[ ] Run tests and show results
[ ] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

> 🔧 called: write_file

Now let me create all the files. I'll start with the rules, then the core, then tests:

> 🔧 **write_file** — src/convention-guard/rules/no-global-strapi.js

### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /**
 * Rule: no-entity-service
 * Flags usage of strapi.entityService / entityService. — deprecated, use strapi.documents.
 */

const ALLOWLIST_PATTERNS = [
  /packages\/core\/types\//,
  /packages\/utils\/upgrade\//,
];

/** @param {string} filePath @returns {boolean} */
function isAllowlisted(filePath) {
  const normalised = filePath.replace(/\\/g, '/');
  return ALLOWLIST_PATTERNS.some((p) => p.test(normalised));
}

/**
 * @param {string} content
 * @param {string} filePath
 * @returns {import('../runner.js').Finding[]}
 */
function check(content, filePath) {
  if (isAllowlisted(filePath)) return [];

  const findings = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/strapi\.entityService|entityService\./.test(lines[i])) {
      findings.push({ line: i + 1, match: lines[i].trim() });
    }
  }
  return findings;
}

export default {
  id: 'no-entity-service',
  description: 'entityService is deprecated — it was replaced by the Document Service API.',
  severity: 'error',
  fixHint: "Replace `strapi.entityService.*` calls with the equivalent `strapi.documents(uid).*` Document Service call.",
  check,
};


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /**
 * Rule: conventional-commit
 * Validates a commit message against Strapi's commitlint config.
 */

const VALID_TYPES = new Set([
  'chore', 'ci', 'docs', 'enhancement', 'feat', 'fix',
  'release', 'revert', 'security', 'test', 'future',
]);

// From .commitlintrc.ts ignores array
const IGNORE_RE = /^Merge branch '.*' into [a-zA-Z0-9\/\-_]+$/;

// Conventional commits: type(optional-scope): description
const COMMIT_RE = /^([a-z]+)(\([^)]*\))?(!)?:\s+\S/;

/**
 * Validates a single commit message string.
 * Returns an array of Finding objects (line is always 0 for commit messages).
 *
 * @param {string} message
 * @returns {import('../runner.js').Finding[]}
 */
function validateCommit(message) {
  if (!message) return [];

  const trimmed = message.trim();

  // Honour the ignore rule from .commitlintrc.ts
  if (IGNORE_RE.test(trimmed)) return [];

  const match = trimmed.match(COMMIT_RE);
  if (!match) {
    return [{
      line: 0,
      match: trimmed,
      detail: "Commit message does not follow the `type(scope): description` format.",
    }];
  }

  const type = match[1];
  if (!VALID_TYPES.has(type)) {
    return [{
      line: 0,
      match: trimmed,
      detail: `"${type}" is not a valid type. Allowed: ${[...VALID_TYPES].sort().join(', ')}.`,
    }];
  }

  return [];
}

/**
 * This rule operates on the commit message, not file content.
 * The runner calls check(content, filePath, context) and we use context.commit.
 *
 * @param {string} _content
 * @param {string} _filePath
 * @param {{ commit?: string }} context
 * @returns {import('../runner.js').Finding[]}
 */
function check(_content, _filePath, context) {
  if (!context || !context.commit) return [];
  // Only run once (not per-file). Runner handles this by flagging commitChecked.
  return [];
}

export default {
  id: 'conventional-commit',
  description: 'Commit messages must follow Conventional Commits to keep the changelog clean.',
  severity: 'error',
  fixHint: "Use format `type(scope): description` where type is one of: chore, ci, docs, enhancement, feat, fix, release, revert, security, test, future.",
  check,
  validateCommit, // exported for direct use by the runner
};


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /**
 * Rule: no-explicit-any
 * Flags `: any` and `as any` in TypeScript files.
 * Severity: warning — the codebase has many existing uses.
 */

const TS_EXTENSIONS = /\.(ts|tsx)$/;

// Matches `: any` (type annotation) or `as any` (type cast) but not e.g. `company`
const ANY_PATTERNS = [
  /(?<![a-zA-Z0-9_$]):\s*any(?![a-zA-Z0-9_$])/,  // : any
  /\bas\s+any(?![a-zA-Z0-9_$])/,                   // as any
];

/**
 * @param {string} content
 * @param {string} filePath
 * @returns {import('../runner.js').Finding[]}
 */
function check(content, filePath) {
  if (!TS_EXTENSIONS.test(filePath)) return [];

  const findings = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip comment-only lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    for (const pattern of ANY_PATTERNS) {
      if (pattern.test(line)) {
        findings.push({ line: i + 1, match: trimmed });
        break; // one finding per line
      }
    }
  }
  return findings;
}

export default {
  id: 'no-explicit-any',
  description: "Using `any` disables TypeScript's type safety — prefer `unknown` or a proper type.",
  severity: 'warning',
  fixHint: "Replace `: any` with a specific type or `unknown`. For gradual migration use `// eslint-disable-next-line @typescript-eslint/no-explicit-any` with a TODO comment.",
  check,
};


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /**
 * Rule: no-raw-sql-interpolation
 * Flags template literals that contain SQL keywords inside raw query calls.
 * Severity: warning — heuristic, may have false positives.
 */

// Raw query method names that suggest SQL is being interpolated
const RAW_CALL_RE = /\.(raw|query|knexRaw|whereRaw|havingRaw|orderByRaw|groupByRaw|joinRaw|fromRaw)\s*\(/;

// SQL keywords that shouldn't be interpolated from variables
const SQL_KEYWORD_RE = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|FROM|WHERE|JOIN)\b/i;

// Template literal containing a ${...} interpolation
const TEMPLATE_INTERPOLATION_RE = /`[^`]*\$\{[^`]*`/;

/**
 * @param {string} content
 * @param {string} filePath
 * @returns {import('../runner.js').Finding[]}
 */
function check(content, filePath) {
  const findings = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    // Must be a raw query call AND contain a template literal with interpolation AND SQL keywords
    if (
      RAW_CALL_RE.test(line) &&
      TEMPLATE_INTERPOLATION_RE.test(line) &&
      SQL_KEYWORD_RE.test(line)
    ) {
      findings.push({ line: i + 1, match: trimmed });
    }
  }
  return findings;
}

export default {
  id: 'no-raw-sql-interpolation',
  description: 'Interpolating variables directly into SQL strings creates SQL injection vulnerabilities.',
  severity: 'warning',
  fixHint: "Use parameterized queries — pass user values as bound parameters, not string interpolation. See Knex docs on `.raw('SELECT ? FROM ??', [val, table])`.",
  check,
};


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /**
 * Rule: examples-folder-touched
 * Warns if passed files are under examples/ (except examples/complex).
 * examples/ is a dev sandbox — changes should not be committed.
 */

/**
 * @param {string} content
 * @param {string} filePath
 * @returns {import('../runner.js').Finding[]}
 */
function check(content, filePath) {
  const normalised = filePath.replace(/\\/g, '/');

  // Match examples/ but not examples/complex
  const inExamples = /(?:^|\/)examples\//.test(normalised);
  if (!inExamples) return [];

  const isComplex = /(?:^|\/)examples\/complex(?:\/|$)/.test(normalised);
  if (isComplex) return [];

  return [{
    line: 0,
    match: filePath,
    detail: "File is inside examples/ which is a dev sandbox and should not receive committed changes.",
  }];
}

export default {
  id: 'examples-folder-touched',
  description: "examples/ is a sandbox for local testing — committed changes here are not published and are rarely intentional.",
  severity: 'warning',
  fixHint: "Move the change to the appropriate package under packages/. Only modify examples/ when specifically asked to update a sandbox app.",
  check,
};


### 🤖 Assistant

> 🔧 called: write_file

Now let me write the runner, reporter, and main index:

> 🔧 **write_file** — /**
 * runner.js — loads all rules and runs them against a list of files.
 *
 * @typedef {{ line: number, match: string, detail?: string }} Finding
 * @typedef {{ id: string, description: string, severity: 'error'|'warning', fixHint: string, check: Function, validateCommit?: Function }} Rule
 * @typedef {{ file: string, ruleId: string, severity: 'error'|'warning', description: string, fixHint: string, line: number, match: string, detail?: string }} Result
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import noGlobalStrapi from './rules/no-global-strapi.js';
import noEntityService from './rules/no-entity-service.js';
import conventionalCommit from './rules/conventional-commit.js';
import noExplicitAny from './rules/no-explicit-any.js';
import noRawSqlInterpolation from './rules/no-raw-sql-interpolation.js';
import examplesFolderTouched from './rules/examples-folder-touched.js';

const ALL_RULES = [
  noGlobalStrapi,
  noEntityService,
  conventionalCommit,
  noExplicitAny,
  noRawSqlInterpolation,
  examplesFolderTouched,
];

/** @param {string} filePath @returns {boolean} */
function shouldSkip(filePath) {
  const normalised = filePath.replace(/\\/g, '/');
  return /\/ee\//.test(normalised) || /__tests__/.test(normalised);
}

/**
 * @param {{ files: string[], commit?: string }} options
 * @returns {{ results: Result[], commitResults: Result[] }}
 */
export function run({ files, commit }) {
  /** @type {Result[]} */
  const results = [];

  // Per-file rules
  for (const filePath of files) {
    if (shouldSkip(filePath)) continue;

    let content;
    try {
      content = readFileSync(resolve(filePath), 'utf8');
    } catch (err) {
      results.push({
        file: filePath,
        ruleId: 'file-read-error',
        severity: 'error',
        description: 'Could not read file.',
        fixHint: 'Check that the file path is correct.',
        line: 0,
        match: '',
        detail: err.message,
      });
      continue;
    }

    for (const rule of ALL_RULES) {
      if (rule.id === 'conventional-commit') continue; // handled separately

      const context = { commit };
      const findings = rule.check(content, filePath, context);
      for (const finding of findings) {
        results.push({
          file: filePath,
          ruleId: rule.id,
          severity: rule.severity,
          description: rule.description,
          fixHint: rule.fixHint,
          line: finding.line,
          match: finding.match,
          detail: finding.detail,
        });
      }
    }
  }

  // Commit message check (once, not per file)
  /** @type {Result[]} */
  const commitResults = [];
  if (commit !== undefined && commit !== null) {
    const findings = conventionalCommit.validateCommit(commit);
    for (const finding of findings) {
      commitResults.push({
        file: '(commit message)',
        ruleId: conventionalCommit.id,
        severity: conventionalCommit.severity,
        description: conventionalCommit.description,
        fixHint: conventionalCommit.fixHint,
        line: finding.line,
        match: finding.match,
        detail: finding.detail,
      });
    }
  }

  return { results, commitResults };
}


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /**
 * reporter.js — formats runner results for terminal or JSON output.
 *
 * @typedef {import('./runner.js').Result} Result
 */

// ANSI colours — disabled when NO_COLOR is set or not a TTY
const USE_COLOR = process.env.NO_COLOR == null && process.stdout.isTTY;

const c = {
  red: (s) => USE_COLOR ? `\x1b[31m${s}\x1b[0m` : s,
  yellow: (s) => USE_COLOR ? `\x1b[33m${s}\x1b[0m` : s,
  cyan: (s) => USE_COLOR ? `\x1b[36m${s}\x1b[0m` : s,
  bold: (s) => USE_COLOR ? `\x1b[1m${s}\x1b[0m` : s,
  dim: (s) => USE_COLOR ? `\x1b[2m${s}\x1b[0m` : s,
  green: (s) => USE_COLOR ? `\x1b[32m${s}\x1b[0m` : s,
};

/**
 * @param {Result[]} results
 * @param {Result[]} commitResults
 * @returns {string}
 */
export function formatTerminal(results, commitResults) {
  const all = [...results, ...commitResults];
  if (all.length === 0) {
    return c.green('✔ No issues found. All convention checks passed.\n');
  }

  const lines = [];

  // Group by ruleId
  /** @type {Map<string, Result[]>} */
  const byRule = new Map();
  for (const r of all) {
    if (!byRule.has(r.ruleId)) byRule.set(r.ruleId, []);
    byRule.get(r.ruleId).push(r);
  }

  for (const [ruleId, items] of byRule) {
    const first = items[0];
    const severityLabel = first.severity === 'error'
      ? c.red('error')
      : c.yellow('warning');

    lines.push('');
    lines.push(`${c.bold(ruleId)} [${severityLabel}]`);
    lines.push(c.dim(`  Why: ${first.description}`));
    lines.push(c.dim(`  Fix: ${first.fixHint}`));
    lines.push('');

    for (const item of items) {
      const loc = item.line > 0
        ? `${item.file}:${item.line}`
        : item.file;
      const locStr = c.cyan(loc);
      const matchStr = item.match ? c.dim(`  → ${item.match.slice(0, 120)}`) : '';
      const detailStr = item.detail ? `  ${c.dim(item.detail)}` : '';
      lines.push(`  ${locStr}`);
      if (matchStr) lines.push(matchStr);
      if (detailStr) lines.push(detailStr);
    }
  }

  lines.push('');

  const errors = all.filter((r) => r.severity === 'error').length;
  const warnings = all.filter((r) => r.severity === 'warning').length;

  const parts = [];
  if (errors > 0) parts.push(c.red(`${errors} error${errors !== 1 ? 's' : ''}`));
  if (warnings > 0) parts.push(c.yellow(`${warnings} warning${warnings !== 1 ? 's' : ''}`));
  lines.push(c.bold(`Found: ${parts.join(', ')}`));
  lines.push('');

  return lines.join('\n');
}

/**
 * @param {Result[]} results
 * @param {Result[]} commitResults
 * @returns {string}
 */
export function formatJSON(results, commitResults) {
  const all = [...results, ...commitResults];
  const errors = all.filter((r) => r.severity === 'error').length;
  const warnings = all.filter((r) => r.severity === 'warning').length;

  return JSON.stringify(
    {
      summary: { errors, warnings, total: all.length },
      results: all,
    },
    null,
    2
  );
}


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — #!/usr/bin/env node
/**
 * convention-guard — CLI entry point
 *
 * Usage (no git required):
 *   node src/convention-guard/index.js --files <paths...> [--commit "<msg>"]
 *
 * Git mode:
 *   node src/convention-guard/index.js --repo <path> [--base <branch>] [--commit "<msg>"]
 *
 * Flags:
 *   --files <paths...>   One or more file paths to check
 *   --commit "<msg>"     Commit message to validate
 *   --repo <path>        Path to a git repository (uses git diff --name-only)
 *   --base <branch>      Base branch for git diff (default: develop)
 *   --json               Output JSON instead of terminal report
 *   --help               Show this help
 */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

import { run } from './runner.js';
import { formatTerminal, formatJSON } from './reporter.js';

// ── Argument parsing ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
convention-guard — Strapi contribution convention checker

Usage:
  node src/convention-guard/index.js --files <paths...> [--commit "<msg>"] [--json]
  node src/convention-guard/index.js --repo <path> [--base <branch>] [--commit "<msg>"] [--json]

Options:
  --files <paths...>   Files to check (space-separated list after the flag)
  --commit "<msg>"     Commit message to validate against Strapi's commitlint rules
  --repo <path>        Git repo path; uses git diff --name-only and git log -1
  --base <branch>      Base branch for --repo mode (default: develop)
  --json               Emit JSON instead of a human-readable report
  --help, -h           Show this help message

Examples:
  node src/convention-guard/index.js --files src/foo.ts src/bar.ts --commit "feat: add thing"
  node src/convention-guard/index.js --repo ./my-strapi --base develop
`);
  process.exit(0);
}

/** @param {string} flag @returns {string|null} */
function getArg(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  return args[idx + 1] ?? null;
}

/** @param {string} flag @returns {string[]} */
function getMultiArg(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return [];
  const values = [];
  for (let i = idx + 1; i < args.length; i++) {
    if (args[i].startsWith('--')) break;
    values.push(args[i]);
  }
  return values;
}

const useJSON = args.includes('--json');
const commitMsg = getArg('--commit');
const repoPath = getArg('--repo');
const baseBranch = getArg('--base') ?? 'develop';

let files = getMultiArg('--files');

// ── Git mode ──────────────────────────────────────────────────────────────────

if (repoPath) {
  const absRepo = resolve(repoPath);
  const gitDir = join(absRepo, '.git');

  if (!existsSync(gitDir)) {
    console.error(
      `⚠  "${absRepo}" does not appear to be a git repository (.git not found).\n` +
      `   Use --files instead to specify files directly:\n` +
      `   node src/convention-guard/index.js --files <paths...>\n`
    );
    process.exit(1);
  }

  try {
    const diffOut = execFileSync(
      'git',
      ['diff', '--name-only', baseBranch, 'HEAD'],
      { cwd: absRepo, encoding: 'utf8' }
    ).trim();

    if (!diffOut) {
      console.log('No changed files found against branch:', baseBranch);
      process.exit(0);
    }

    files = diffOut.split('\n').map((f) => join(absRepo, f));
  } catch (err) {
    console.error('git diff failed:', err.message);
    process.exit(1);
  }
}

// ── Validate inputs ───────────────────────────────────────────────────────────

if (files.length === 0 && commitMsg === null) {
  console.error('Error: provide --files <paths...> or --repo <path>, or --commit "<msg>".\nRun with --help for usage.');
  process.exit(1);
}

// ── Run ───────────────────────────────────────────────────────────────────────

const { results, commitResults } = run({ files, commit: commitMsg });

if (useJSON) {
  process.stdout.write(formatJSON(results, commitResults) + '\n');
} else {
  process.stdout.write(formatTerminal(results, commitResults));
}

const hasErrors =
  results.some((r) => r.severity === 'error') ||
  commitResults.some((r) => r.severity === 'error');

process.exit(hasErrors ? 1 : 0);


### 🤖 Assistant

> 🔧 called: update_todo_list

Now let me write the tests. First, let me create the fixture files:

> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[x] Design the module structure for convention-guard
[x] Implement core CLI (index.js, runner, reporter)
[x] Implement rule: no-global-strapi
[x] Implement rule: no-entity-service
[x] Implement rule: conventional-commit
[x] Implement rule: no-explicit-any
[x] Implement rule: no-raw-sql-interpolation
[x] Implement rule: examples-folder-touched
[-] Write tests in src/convention-guard/__tests__/
[ ] Write src/convention-guard/README.md
[ ] Run tests and show results
[ ] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

> 🔧 called: write_file, write_file, write_file, write_file, write_file, write_file, write_file, write_file, write_file, write_file



> 🔧 **write_file** — // fixture: passes no-global-strapi (allowlisted file)
export {};


> 🔧 **write_file** — // fixture: fails no-global-strapi
const instance = global.strapi;
export {};


> 🔧 **write_file** — // fixture: passes no-entity-service
const doc = strapi.documents('api::article.article');
export {};


> 🔧 **write_file** — // fixture: fails no-entity-service
const result = await strapi.entityService.findMany('api::article.article');
export {};


> 🔧 **write_file** — // fixture: passes no-explicit-any
const foo: unknown = getVal();
const bar = value as string;
export {};


> 🔧 **write_file** — // fixture: fails no-explicit-any
const body = ctx.request.body as any;
const data: any = {};
export {};


> 🔧 **write_file** — // fixture: passes no-raw-sql-interpolation — parameterized query
const rows = await db.raw('SELECT * FROM ?? WHERE id = ?', [table, id]);
export {};


> 🔧 **write_file** — // fixture: fails no-raw-sql-interpolation — interpolated SQL
const rows = await db.raw(`SELECT * FROM ${table} WHERE id = ${id}`);
export {};


> 🔧 **write_file** — // fixture: examples pass — inside examples/complex (allowed)
export const helper = () => {};


> 🔧 **write_file** — // fixture: examples fail — inside examples/getstarted (not allowed)
export const helper = () => {};


### 🤖 Assistant

> 🔧 called: write_file

Now write the test file:

> 🔧 **write_file** — /**
 * Tests for convention-guard rules using node:test
 * Run: node --test src/convention-guard/__tests__/rules.test.js
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import noGlobalStrapi from '../rules/no-global-strapi.js';
import noEntityService from '../rules/no-entity-service.js';
import conventionalCommit from '../rules/conventional-commit.js';
import noExplicitAny from '../rules/no-explicit-any.js';
import noRawSqlInterpolation from '../rules/no-raw-sql-interpolation.js';
import examplesFolderTouched from '../rules/examples-folder-touched.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fix = (...parts) => join(__dirname, 'fixtures', ...parts);
const read = (p) => readFileSync(p, 'utf8');

// ── no-global-strapi ──────────────────────────────────────────────────────────

test('no-global-strapi: pass — regular file with no global.strapi', () => {
  const path = fix('no-global-strapi', 'pass.ts');
  const findings = noGlobalStrapi.check(read(path), path);
  assert.equal(findings.length, 0, 'expected no findings');
});

test('no-global-strapi: fail — regular file using global.strapi', () => {
  const path = fix('no-global-strapi', 'fail.ts');
  const findings = noGlobalStrapi.check(read(path), path);
  assert.ok(findings.length > 0, 'expected at least one finding');
  assert.equal(findings[0].line, 2);
});

test('no-global-strapi: pass — allowlisted Strapi.ts file', () => {
  // Simulate the actual allowlisted path
  const fakePath = 'packages/core/core/src/Strapi.ts';
  const content = 'delete global.strapi;';
  const findings = noGlobalStrapi.check(content, fakePath);
  assert.equal(findings.length, 0, 'allowlisted file should produce no findings');
});

test('no-global-strapi: pass — allowlisted index.ts file', () => {
  const fakePath = 'packages/core/core/src/index.ts';
  const content = 'global.strapi = strapi;';
  const findings = noGlobalStrapi.check(content, fakePath);
  assert.equal(findings.length, 0, 'allowlisted file should produce no findings');
});

// ── no-entity-service ─────────────────────────────────────────────────────────

test('no-entity-service: pass — uses Document Service', () => {
  const path = fix('no-entity-service', 'pass.ts');
  const findings = noEntityService.check(read(path), path);
  assert.equal(findings.length, 0, 'expected no findings');
});

test('no-entity-service: fail — uses strapi.entityService', () => {
  const path = fix('no-entity-service', 'fail.ts');
  const findings = noEntityService.check(read(path), path);
  assert.ok(findings.length > 0, 'expected at least one finding');
  assert.equal(findings[0].line, 2);
});

test('no-entity-service: pass — allowlisted types package', () => {
  const fakePath = 'packages/core/types/src/index.ts';
  const content = 'entityService.findMany(uid, params)';
  const findings = noEntityService.check(content, fakePath);
  assert.equal(findings.length, 0, 'allowlisted path should produce no findings');
});

// ── conventional-commit ───────────────────────────────────────────────────────

test('conventional-commit: pass — valid feat commit', () => {
  const findings = conventionalCommit.validateCommit('feat(admin): add bulk delete');
  assert.equal(findings.length, 0);
});

test('conventional-commit: pass — valid fix with no scope', () => {
  const findings = conventionalCommit.validateCommit('fix: preserve relation order');
  assert.equal(findings.length, 0);
});

test('conventional-commit: pass — ignored merge branch message', () => {
  const findings = conventionalCommit.validateCommit("Merge branch 'feat/thing' into develop");
  assert.equal(findings.length, 0, 'merge branch message should be ignored');
});

test('conventional-commit: fail — invalid type', () => {
  const findings = conventionalCommit.validateCommit('added new feature');
  assert.ok(findings.length > 0, 'expected a finding for bad commit message');
});

test('conventional-commit: fail — unknown type "update"', () => {
  const findings = conventionalCommit.validateCommit('update: something');
  assert.ok(findings.length > 0, 'expected a finding for unknown type');
  assert.ok(findings[0].detail.includes('"update"'), `detail should mention "update", got: ${findings[0].detail}`);
});

test('conventional-commit: pass — all valid types accepted', () => {
  const validTypes = ['chore', 'ci', 'docs', 'enhancement', 'feat', 'fix', 'release', 'revert', 'security', 'test', 'future'];
  for (const type of validTypes) {
    const findings = conventionalCommit.validateCommit(`${type}: do something`);
    assert.equal(findings.length, 0, `type "${type}" should be valid`);
  }
});

// ── no-explicit-any ───────────────────────────────────────────────────────────

test('no-explicit-any: pass — uses unknown and specific types', () => {
  const path = fix('no-explicit-any', 'pass.ts');
  const findings = noExplicitAny.check(read(path), path);
  assert.equal(findings.length, 0, 'expected no findings');
});

test('no-explicit-any: fail — uses as any and : any', () => {
  const path = fix('no-explicit-any', 'fail.ts');
  const findings = noExplicitAny.check(read(path), path);
  assert.ok(findings.length >= 2, `expected at least 2 findings, got ${findings.length}`);
});

test('no-explicit-any: pass — non-TypeScript file is skipped', () => {
  const findings = noExplicitAny.check('const x: any = foo as any;', 'some/file.js');
  assert.equal(findings.length, 0, '.js files should be skipped');
});

// ── no-raw-sql-interpolation ──────────────────────────────────────────────────

test('no-raw-sql-interpolation: pass — parameterized query', () => {
  const path = fix('no-raw-sql-interpolation', 'pass.js');
  const findings = noRawSqlInterpolation.check(read(path), path);
  assert.equal(findings.length, 0, 'expected no findings for parameterized query');
});

test('no-raw-sql-interpolation: fail — interpolated SQL in template literal', () => {
  const path = fix('no-raw-sql-interpolation', 'fail.js');
  const findings = noRawSqlInterpolation.check(read(path), path);
  assert.ok(findings.length > 0, 'expected a finding for interpolated SQL');
});

// ── examples-folder-touched ───────────────────────────────────────────────────

test('examples-folder-touched: pass — file outside examples/', () => {
  const findings = examplesFolderTouched.check('', 'packages/core/src/index.ts');
  assert.equal(findings.length, 0);
});

test('examples-folder-touched: pass — file inside examples/complex (migration fixture)', () => {
  const path = fix('examples-folder-touched', 'examples', 'complex', 'allowed.ts');
  const findings = examplesFolderTouched.check(read(path), path);
  assert.equal(findings.length, 0, 'examples/complex should be allowed');
});

test('examples-folder-touched: fail — file inside examples/getstarted', () => {
  const path = fix('examples-folder-touched', 'examples', 'getstarted', 'fail.ts');
  const findings = examplesFolderTouched.check(read(path), path);
  assert.ok(findings.length > 0, 'expected a finding for examples/getstarted');
});

test('examples-folder-touched: fail — file inside examples/sandbox using virtual path', () => {
  const findings = examplesFolderTouched.check('', 'repo/examples/getstarted/src/index.ts');
  assert.ok(findings.length > 0, 'expected a finding');
});


### 🤖 Assistant

> 🔧 called: write_file

Now let's write the README and then run the tests:

> 🔧 **write_file** — # convention-guard

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


### 🤖 Assistant

> 🔧 called: update_todo_list

Now let's run the tests:

> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[x] Design the module structure for convention-guard
[x] Implement core CLI (index.js, runner, reporter)
[x] Implement rule: no-global-strapi
[x] Implement rule: no-entity-service
[x] Implement rule: conventional-commit
[x] Implement rule: no-explicit-any
[x] Implement rule: no-raw-sql-interpolation
[x] Implement rule: examples-folder-touched
[x] Write tests in src/convention-guard/__tests__/
[x] Write src/convention-guard/README.md
[-] Run tests and show results
[ ] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — node --test src/convention-guard/__tests__/rules.test.js 2>&1

### 🤖 Assistant

> 🔧 called: read_file

One test failure: the `fail.ts` fixture has two `any` uses but line 1 is a comment, and our rule only counts one finding (the `as any` and `: any` are on different lines). Let me check:

> 🔧 **read_file** — src/convention-guard/__tests__/fixtures/no-explicit-any/fail.ts

### 🤖 Assistant

> 🔧 called: execute_command

Two lines both have `any` — line 2 has `as any`, line 3 has `: any`. The rule should find both. Let me debug:

> 🔧 **execute_command** — node -e "
import('./src/convention-guard/rules/no-explicit-any.js').then(m => {
  const content = \`// fixture: fails no-explicit-any
const body = ctx.request.body as any;
const data: any = {};
export {};
\`;
  const path = 'test/fail.ts';
  const results = m.default.check(content, path);
  console.log('findings:', JSON.stringify(results, null, 2));
})" 2>&1

### 🤖 Assistant

> 🔧 called: execute_command

I see — `const data: any = {}` — the regex `/(?<![a-zA-Z0-9_$]):\s*any(?![a-zA-Z0-9_$])/` should match `: any`. Let me test it directly:

> 🔧 **execute_command** — node -e "
const line = 'const data: any = {};';
const pat = /(?<![a-zA-Z0-9_\$]):\s*any(?![a-zA-Z0-9_\$])/;
console.log('matches:', pat.test(line));
"

### 🤖 Assistant

> 🔧 called: execute_command

The lookbehind is failing because `:` itself is the character before `any`, but we're testing if the char before `:` is not alphanumeric. The issue is the lookbehind pattern — `:\s*any` means the character immediately before `:` matters, but the lookbehind pattern `(?<![a-zA-Z0-9_$])` is checking the character before `:` . Let me investigate:

> 🔧 **execute_command** — node -e "
const line = 'const data: any = {};';
// Test simplified pattern
console.log(/:\s*any\b/.test(line));
console.log(line.match(/:\s*any\b/));
"

### 🤖 Assistant

> 🔧 called: apply_diff

The pattern itself works — the issue is my lookbehind on `any` — `(?![a-zA-Z0-9_$])` after `any` is satisfied (next char is ` `), but `(?<![a-zA-Z0-9_$])` before `:` is checking the character just before `:` which is `a` (from `data`) — that's alphanumeric! So it correctly matches `any` preceded by `:` but my negative lookbehind at the start is blocking it. The intent of that lookbehind was to avoid matching things like `:company` — let me fix the pattern to just use `:\s*any\b`:

> 🔧 **apply_diff** — src/convention-guard/rules/no-explicit-any.js

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — node --test src/convention-guard/__tests__/rules.test.js 2>&1

### 🤖 Assistant

> 🔧 called: update_todo_list

All 22 tests pass. Now run the real demo:

> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[x] Design the module structure for convention-guard
[x] Implement core CLI (index.js, runner, reporter)
[x] Implement rule: no-global-strapi
[x] Implement rule: no-entity-service
[x] Implement rule: conventional-commit
[x] Implement rule: no-explicit-any
[x] Implement rule: no-raw-sql-interpolation
[x] Implement rule: examples-folder-touched
[x] Write tests in src/convention-guard/__tests__/
[x] Write src/convention-guard/README.md
[x] Run tests and show results
[-] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — node src/convention-guard/index.js \
  --files \
    target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts \
    target/strapi/packages/plugins/documentation/server/src/utils.ts \
    target/strapi/packages/core/core/src/Strapi.ts \
  --commit "added new feature" \
  --json 2>&1

### 🤖 Assistant

> 🔧 called: apply_diff

Good output, but I need to address two issues:

1. **`Strapi.ts` is allowlisted for `no-global-strapi`** ✅ — no `global.strapi` finding for it (correct, it only shows `no-entity-service` because of the JSDoc comment and `no-explicit-any`)
2. **`Strapi.ts` showing `no-entity-service` at line 113** — that's a JSDoc comment (`* @deprecated strapi.entityService...`). The rule should skip comment lines.
3. **`Strapi.ts` `no-global-strapi` is correctly absent** ✅

The `no-entity-service` rule needs to skip comment lines too:

> 🔧 **apply_diff** — src/convention-guard/rules/no-entity-service.js

### 🤖 Assistant

> 🔧 called: apply_diff

Also, `no-global-strapi` should similarly skip comment lines:

> 🔧 **apply_diff** — <<<<<<< SEARCH
:start_line:31
-------
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/global\.strapi/.test(lines[i])) {
      findings.push({ line: i + 1, match: lines[i].trim() });
    }
  }
=======
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    if (/global\.strapi/.test(lines[i])) {
      findings.push({ line: i + 1, match: trimmed });
    }
  }
>>>>>>> REPLACE


### 🤖 Assistant

> 🔧 called: execute_command

Now let me re-run tests to make sure the changes don't break anything:

> 🔧 **execute_command** — node --test src/convention-guard/__tests__/rules.test.js 2>&1

### 🤖 Assistant

> 🔧 called: execute_command

22/22 pass. Now run the real demo and save the output:

> 🔧 **execute_command** — node src/convention-guard/index.js \
  --files \
    target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts \
    target/strapi/packages/plugins/documentation/server/src/utils.ts \
    target/strapi/packages/core/core/src/Strapi.ts \
  --commit "added new feature" 2>&1 | tee outputs/convention-guard-demo.txt; echo "Exit code: $?"

### 🤖 Assistant

> 🔧 called: execute_command

The exit code showed 0 but there are errors — that's because `tee` is consuming the exit code. Let me verify the actual exit code from the tool:

> 🔧 **execute_command** — node src/convention-guard/index.js \
  --files \
    target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts \
    target/strapi/packages/plugins/documentation/server/src/utils.ts \
    target/strapi/packages/core/core/src/Strapi.ts \
  --commit "added new feature"; echo "CLI exit: $?"

### 🤖 Assistant

> 🔧 called: execute_command

Exit code 1 confirmed. Now save the demo output properly (without ANSI codes for the file):

> 🔧 **execute_command** — NO_COLOR=1 node src/convention-guard/index.js \
  --files \
    target/strapi/packages/plugins/i18n/server/src/controllers/validate-locale-creation.ts \
    target/strapi/packages/plugins/documentation/server/src/utils.ts \
    target/strapi/packages/core/core/src/Strapi.ts \
  --commit "added new feature" > outputs/convention-guard-demo.txt 2>&1; echo "saved, exit was $?"

### 🤖 Assistant

> 🔧 called: read_file



> 🔧 **read_file** — outputs/convention-guard-demo.txt

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Read target/strapi/AGENTS.md and target/strapi/.commitlintrc.ts to extract rules
[x] Design the module structure for convention-guard
[x] Implement core CLI (index.js, runner, reporter)
[x] Implement rule: no-global-strapi
[x] Implement rule: no-entity-service
[x] Implement rule: conventional-commit
[x] Implement rule: no-explicit-any
[x] Implement rule: no-raw-sql-interpolation
[x] Implement rule: examples-folder-touched
[x] Write tests in src/convention-guard/__tests__/
[x] Write src/convention-guard/README.md
[x] Run tests and show results
[x] Run real demo against Strapi files and save to outputs/convention-guard-demo.txt


### 🤖 Assistant

Everything is done. Here's a full summary:

---

## Results

### Tests: 22/22 passed ✅

```
✔ no-global-strapi: pass — regular file with no global.strapi
✔ no-global-strapi: fail — regular file using global.strapi
✔ no-global-strapi: pass — allowlisted Strapi.ts file
✔ no-global-strapi: pass — allowlisted index.ts file
✔ no-entity-service: pass / fail / allowlisted types package
✔ conventional-commit: pass / fail (invalid type, unknown "update", all 11 valid types)
✔ no-explicit-any: pass / fail / non-TS file skipped
✔ no-raw-sql-interpolation: pass (parameterized) / fail (interpolated)
✔ examples-folder-touched: pass (outside) / pass (complex) / fail (getstarted) / fail (virtual path)
```

### Real demo findings (saved to [`outputs/convention-guard-demo.txt`](outputs/convention-guard-demo.txt))

| Rule | File | Finding |
|------|------|---------|
| `no-entity-service` | `validate-locale-creation.ts:44` | `strapi.entityService.findMany(...)` — deprecated API |
| `no-explicit-any` | `validate-locale-creation.ts:18,46` | `as any` usages |
| `no-explicit-any` | `Strapi.ts:54,544,549` | `app: any` and `(global as any)` casts |
| `no-global-strapi` | `utils.ts:7` | Default parameter `{ strapi: global.strapi }` |
| `conventional-commit` | (commit message) | `"added new feature"` missing `type:` prefix |

**`Strapi.ts` is correctly allowlisted for `no-global-strapi`** — its `delete global.strapi` line at 571–572 produces zero findings. It does show `no-entity-service` and `no-explicit-any` because those aren't allowlisted (it's the core file that *defines* the deprecated API and also has `app: any`), which is expected and correct.

**Exit code: 1** (3 errors present).

### File structure created

```
src/convention-guard/
├── index.js                    # CLI entry point (--files / --repo / --commit / --json)
├── runner.js                   # Reads files, applies all rules, returns results
├── reporter.js                 # Terminal (ANSI) + JSON formatters
├── README.md
├── rules/
│   ├── no-global-strapi.js
│   ├── no-entity-service.js
│   ├── conventional-commit.js  # validateCommit() uses regex from .commitlintrc.ts
│   ├── no-explicit-any.js
│   ├── no-raw-sql-interpolation.js
│   └── examples-folder-touched.js
└── __tests__/
    ├── rules.test.js           # 22 node:test tests
    └── fixtures/               # pass/fail fixtures per rule
```
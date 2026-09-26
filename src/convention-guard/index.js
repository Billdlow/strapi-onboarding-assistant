#!/usr/bin/env node
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

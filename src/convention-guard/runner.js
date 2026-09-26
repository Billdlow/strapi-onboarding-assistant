/**
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

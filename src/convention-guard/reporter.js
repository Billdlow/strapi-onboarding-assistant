/**
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

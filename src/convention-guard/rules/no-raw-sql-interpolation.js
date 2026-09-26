/**
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

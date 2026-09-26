/**
 * Rule: no-explicit-any
 * Flags `: any` and `as any` in TypeScript files.
 * Severity: warning — the codebase has many existing uses.
 */

const TS_EXTENSIONS = /\.(ts|tsx)$/;

// Matches `: any` (type annotation) or `as any` (type cast) but not e.g. `company`
const ANY_PATTERNS = [
  /:\s*any\b/,        // : any  (type annotation)
  /\bas\s+any\b/,     // as any (type cast)
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

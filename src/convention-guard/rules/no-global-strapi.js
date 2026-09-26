/**
 * Rule: no-global-strapi
 * Flags usage of `global.strapi` — the correct pattern is DI via the `strapi` parameter.
 */

const ALLOWLIST = new Set([
  'packages/core/core/src/Strapi.ts',
  'packages/core/core/src/index.ts',
]);

/** @param {string} filePath @returns {boolean} */
function isAllowlisted(filePath) {
  const normalised = filePath.replace(/\\/g, '/');
  for (const allowed of ALLOWLIST) {
    if (normalised.endsWith(allowed)) return true;
  }
  return false;
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
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    if (/global\.strapi/.test(lines[i])) {
      findings.push({ line: i + 1, match: trimmed });
    }
  }
  return findings;
}

export default {
  id: 'no-global-strapi',
  description: 'Use of global.strapi bypasses dependency injection and breaks modularity.',
  severity: 'error',
  fixHint: "Receive `strapi` as a parameter via the factory pattern (e.g. `createService(strapi)`) instead of reading `global.strapi`.",
  check,
};

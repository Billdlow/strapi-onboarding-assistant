/**
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
    const trimmed = lines[i].trim();
    // Skip comment lines (single-line // and doc-comment * lines)
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    if (/strapi\.entityService|entityService\./.test(lines[i])) {
      findings.push({ line: i + 1, match: trimmed });
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

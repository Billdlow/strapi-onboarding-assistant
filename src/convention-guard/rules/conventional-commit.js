/**
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

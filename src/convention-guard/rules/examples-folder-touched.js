/**
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

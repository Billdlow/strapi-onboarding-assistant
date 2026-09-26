/**
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

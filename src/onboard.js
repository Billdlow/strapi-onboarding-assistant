#!/usr/bin/env node
/**
 * onboard.js — Strapi onboarding assistant CLI
 *
 * Usage:
 *   node src/onboard.js                      → interactive menu
 *   node src/onboard.js architecture         → print outputs/architecture.md
 *   node src/onboard.js trace <feature>      → print outputs/trace-<feature>.md
 *   node src/onboard.js learn <role>         → print matching path from learning-paths.md
 *   node src/onboard.js quiz                 → interactive quiz from outputs/quiz.md
 *   node src/onboard.js impact               → print outputs/impact.md
 *   node src/onboard.js setup                → run setup-doctor.sh + print first-run section
 *   node src/onboard.js tasks [level]        → print starter tasks, optionally filtered 1/2/3
 *   node src/onboard.js check [files...]     → run convention-guard or show demo
 */

import { readFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Helpers ──────────────────────────────────────────────────────────────────

function readOutput(name) {
  const p = resolve(ROOT, 'outputs', name);
  if (!existsSync(p)) {
    die(`File not found: outputs/${name}`);
  }
  return readFileSync(p, 'utf8');
}

function die(msg) {
  console.error(`\x1b[31mError:\x1b[0m ${msg}`);
  process.exit(1);
}

/** Minimal Markdown → terminal renderer (headings, bold, code, rules). */
function renderMd(text) {
  const lines = text.split('\n');
  const out = [];
  let inCode = false;

  for (const raw of lines) {
    if (raw.startsWith('```')) {
      inCode = !inCode;
      out.push(inCode ? '\x1b[90m' : '\x1b[0m');
      continue;
    }
    if (inCode) {
      out.push(`  \x1b[36m${raw}\x1b[0m`);
      continue;
    }

    // headings
    const h3 = raw.match(/^### (.+)/);
    if (h3) { out.push(`\n\x1b[1m\x1b[4m${h3[1]}\x1b[0m`); continue; }
    const h2 = raw.match(/^## (.+)/);
    if (h2) { out.push(`\n\x1b[1m\x1b[33m${h2[1]}\x1b[0m`); continue; }
    const h1 = raw.match(/^# (.+)/);
    if (h1) { out.push(`\n\x1b[1m\x1b[32m${h1[1]}\x1b[0m`); continue; }

    // horizontal rule
    if (/^---+$/.test(raw.trim())) {
      out.push('\x1b[90m' + '─'.repeat(60) + '\x1b[0m');
      continue;
    }

    // inline bold
    const line = raw.replace(/\*\*(.+?)\*\*/g, '\x1b[1m$1\x1b[0m');
    out.push(line);
  }
  return out.join('\n');
}

function print(text) {
  console.log(renderMd(text));
}

// ── Command implementations ───────────────────────────────────────────────────

function cmdArchitecture() {
  print(readOutput('architecture.md'));
}

const VALID_TRACES = ['publish', 'login', 'create-content-type', 'upload'];

function cmdTrace(feature) {
  if (!feature) {
    print(readOutput('feature-index.md'));
    return;
  }
  if (!VALID_TRACES.includes(feature)) {
    die(`Unknown feature "${feature}". Valid options: ${VALID_TRACES.join(', ')}`);
  }
  print(readOutput(`trace-${feature}.md`));
}

const ROLE_MAP = {
  backend: 'Path A',
  'backend-contributor': 'Path A',
  frontend: 'Path B',
  admin: 'Path B',
  'frontend-contributor': 'Path B',
  'admin-contributor': 'Path B',
  plugin: 'Path C',
  'plugin-developer': 'Path C',
  'plugin-dev': 'Path C',
};

function cmdLearn(role) {
  const text = readOutput('learning-paths.md');

  if (!role) {
    print(text);
    return;
  }

  const key = role.toLowerCase().replace(/\s+/g, '-');
  const pathLabel = ROLE_MAP[key];
  if (!pathLabel) {
    console.error(`Unknown role "${role}". Available roles: backend, frontend, plugin`);
    console.error('Showing full learning paths instead.\n');
    print(text);
    return;
  }

  // Extract from "## Path X" to the next "## Path" or EOF
  const pathRegex = new RegExp(
    `(## ${pathLabel}[\\s\\S]+?)(?=\\n## Path [A-Z]|\\n## Quick-reference|$)`,
  );
  const match = text.match(pathRegex);
  if (!match) {
    print(text);
    return;
  }
  print(match[1].trim());
}

/** Parse quiz.md into an array of question objects. */
function parseQuiz(text) {
  const questions = [];
  // Split on question blocks: ### Q<n>
  const qBlocks = text.split(/\n### Q\d+\n/);
  // First element is the preamble; skip it.
  const answerSection = text.match(/## Answers[\s\S]+$/)?.[0] ?? '';

  for (let i = 1; i < qBlocks.length; i++) {
    const block = qBlocks[i];
    const lines = block.trim().split('\n');

    // Collect option lines (- A) … - D))
    const questionLines = [];
    const options = [];
    for (const line of lines) {
      const opt = line.match(/^- ([A-D])\) (.+)/);
      if (opt) {
        options.push({ letter: opt[1], text: opt[2] });
      } else if (line.trim() !== '---') {
        questionLines.push(line);
      }
    }

    // Find answer block: ### A<i>
    const aRegex = new RegExp(`### A${i} — \\*\\*([A-D])\\*\\* (.+?)\\n\\n\\*\\*Explanation:\\*\\* ([\\s\\S]+?)\\n\\n\\*\\*Doc reference:\\*\\* ([\\s\\S]+?)(?=\\n---|\n### A|$)`);
    const aMatch = answerSection.match(aRegex);

    questions.push({
      number: i,
      text: questionLines.filter(Boolean).join('\n'),
      options,
      answer: aMatch?.[1] ?? '?',
      explanation: aMatch?.[3]?.trim() ?? '',
      docRef: aMatch?.[4]?.trim() ?? '',
    });
  }
  return questions;
}

async function cmdQuiz() {
  const text = readOutput('quiz.md');
  const questions = parseQuiz(text);

  if (questions.length === 0) {
    die('Could not parse quiz questions from outputs/quiz.md');
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  let score = 0;
  let closedEarly = false;

  rl.on('close', () => {
    if (closedEarly) {
      const pct = Math.round((score / questions.length) * 100);
      console.log(`\n\x1b[1mFinal score so far: ${score} / ${questions.length} (${pct}%)\x1b[0m`);
      process.exit(0);
    }
  });

  console.log('\n\x1b[1m\x1b[32mStrapi Monorepo — New Contributor Quiz\x1b[0m');
  console.log(`\x1b[90m${questions.length} questions · type the letter and press Enter\x1b[0m\n`);

  for (const q of questions) {
    console.log(`\x1b[1mQ${q.number}.\x1b[0m ${q.text}`);
    for (const opt of q.options) {
      console.log(`  \x1b[36m${opt.letter})\x1b[0m ${opt.text}`);
    }

    let answer = '';
    closedEarly = true;
    while (!['A', 'B', 'C', 'D'].includes(answer)) {
      answer = (await ask('\nYour answer (A/B/C/D): ')).trim().toUpperCase();
    }
    closedEarly = false;

    const correct = answer === q.answer;
    if (correct) {
      score++;
      console.log('\x1b[32m✓ Correct!\x1b[0m');
    } else {
      console.log(`\x1b[31m✗ Incorrect. The answer is ${q.answer}.\x1b[0m`);
    }

    if (q.explanation) {
      console.log(`\n\x1b[33mExplanation:\x1b[0m ${q.explanation}`);
    }
    if (q.docRef) {
      console.log(`\x1b[90mDoc reference: ${q.docRef}\x1b[0m`);
    }
    console.log('\n' + '─'.repeat(60) + '\n');
  }

  closedEarly = false;
  rl.close();

  const pct = Math.round((score / questions.length) * 100);
  const grade =
    pct === 100 ? '\x1b[32mPerfect score! 🎉\x1b[0m' :
    pct >= 80   ? '\x1b[32mGreat work!\x1b[0m' :
    pct >= 60   ? '\x1b[33mNot bad — review the explanations above.\x1b[0m' :
                  '\x1b[31mKeep studying — re-read outputs/architecture.md.\x1b[0m';

  console.log(`\x1b[1mFinal score: ${score} / ${questions.length} (${pct}%)\x1b[0m  ${grade}`);
}

function cmdImpact() {
  print(readOutput('impact.md'));
}

function cmdSetup() {
  const doctorScript = resolve(ROOT, 'scripts', 'setup-doctor.sh');
  if (!existsSync(doctorScript)) {
    console.warn('\x1b[33mWarning:\x1b[0m scripts/setup-doctor.sh not found; skipping doctor check.\n');
  } else {
    console.log('\x1b[1m\x1b[32mRunning setup-doctor.sh…\x1b[0m\n');
    try {
      execSync(`bash "${doctorScript}"`, { stdio: 'inherit' });
    } catch {
      // doctor may exit non-zero when checks fail; continue to print guide
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log('\x1b[1m\x1b[32mFirst-run setup guide\x1b[0m\n');

  const guide = readOutput('setup-guide.md');
  // Extract the "## 2. Step-by-step first run" section
  const match = guide.match(/(## 2\. Step-by-step first run[\s\S]+?)(?=\n## \d+\.|\n## Quick|\n## [A-Z]|$)/);
  print(match ? match[1].trim() : guide);
}

const LEVEL_HEADERS = {
  '1': 'Level 1',
  '2': 'Level 2',
  '3': 'Level 3',
};

function cmdTasks(level) {
  const text = readOutput('starter-tasks.md');

  if (!level) {
    print(text);
    return;
  }

  const label = LEVEL_HEADERS[level];
  if (!label) {
    die(`Unknown level "${level}". Use 1, 2, or 3.`);
  }

  const regex = new RegExp(
    `(## ${label}[\\s\\S]+?)(?=\\n## Level [123]|\\n## [A-Z]|$)`,
  );
  const match = text.match(regex);
  if (!match) {
    die(`Could not find Level ${level} in outputs/starter-tasks.md`);
  }
  print(match[1].trim());
}

function cmdCheck(files) {
  const guardEntry = resolve(ROOT, 'src', 'convention-guard', 'index.js');

  if (files.length === 0) {
    // Show the recorded demo output
    const demo = resolve(ROOT, 'outputs', 'convention-guard-demo.txt');
    if (!existsSync(demo)) {
      die('outputs/convention-guard-demo.txt not found');
    }
    console.log('\x1b[1m\x1b[33mDemo output (convention-guard-demo.txt):\x1b[0m\n');
    console.log(readFileSync(demo, 'utf8'));
    return;
  }

  if (!existsSync(guardEntry)) {
    die('src/convention-guard/index.js not found');
  }

  const fileArgs = files.map((f) => `"${f}"`).join(' ');
  try {
    execSync(`node "${guardEntry}" --files ${fileArgs}`, { stdio: 'inherit' });
  } catch {
    // convention-guard exits non-zero on violations; that is expected
  }
}

// ── Interactive menu ──────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { key: '1', label: 'architecture',            desc: 'Monorepo architecture overview' },
  { key: '2', label: 'trace <feature>',         desc: 'Feature trace (publish/login/create-content-type/upload)' },
  { key: '3', label: 'learn <role>',            desc: 'Learning path (backend/frontend/plugin)' },
  { key: '4', label: 'quiz',                    desc: 'Interactive contributor quiz' },
  { key: '5', label: 'impact',                  desc: 'Project impact summary' },
  { key: '6', label: 'setup',                   desc: 'Environment check + first-run guide' },
  { key: '7', label: 'tasks [level]',           desc: 'Starter tasks (level 1/2/3)' },
  { key: '8', label: 'check [files...]',        desc: 'Run convention-guard or show demo' },
  { key: 'q', label: 'quit',                    desc: '' },
];

async function interactiveMenu() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log('\n\x1b[1m\x1b[32mStrapi Onboarding Assistant\x1b[0m');
  console.log('\x1b[90mSelect a command to run, or type a command with arguments.\x1b[0m\n');

  while (true) {
    for (const item of MENU_ITEMS) {
      const label = item.label.padEnd(28);
      const desc = item.desc ? `\x1b[90m${item.desc}\x1b[0m` : '';
      console.log(`  \x1b[36m${item.key}\x1b[0m  ${label}${desc}`);
    }

    const input = (await ask('\n\x1b[1mChoice or command:\x1b[0m ')).trim();
    if (!input || input === 'q' || input === 'quit') break;

    // Allow either a menu number or a full command string
    let tokens;
    const byKey = MENU_ITEMS.find((m) => m.key === input);
    if (byKey && byKey.label !== 'quit') {
      // prompt for argument if the command takes one
      const baseCmd = byKey.label.split(' ')[0];
      const needsArg = byKey.label.includes('<') || byKey.label.includes('[');
      let arg = '';
      if (needsArg) {
        arg = (await ask(`  Argument for "${baseCmd}" (or press Enter to skip): `)).trim();
      }
      tokens = arg ? [baseCmd, ...arg.split(/\s+/)] : [baseCmd];
    } else {
      tokens = input.split(/\s+/);
    }

    console.log('');
    try {
      await dispatch(tokens);
    } catch (err) {
      console.error('\x1b[31mError:\x1b[0m', err.message);
    }
    console.log('');
  }

  rl.close();
  console.log('\nGoodbye!');
}

// ── Dispatcher ────────────────────────────────────────────────────────────────

async function dispatch(args) {
  const [cmd, ...rest] = args;

  switch (cmd) {
    case 'architecture': return cmdArchitecture();
    case 'trace':        return cmdTrace(rest[0]);
    case 'learn':        return cmdLearn(rest.join(' '));
    case 'quiz':         return cmdQuiz();
    case 'impact':       return cmdImpact();
    case 'setup':        return cmdSetup();
    case 'tasks':        return cmdTasks(rest[0]);
    case 'check':        return cmdCheck(rest);
    default:
      console.error(`\x1b[31mError:\x1b[0m Unknown command: "${cmd}"`);
      console.error('Run without arguments for the interactive menu.');
      process.exit(1);
  }
}

// ── Entry point ───────────────────────────────────────────────────────────────

const cliArgs = process.argv.slice(2);

if (cliArgs.length === 0) {
  await interactiveMenu();
} else {
  await dispatch(cliArgs);
}

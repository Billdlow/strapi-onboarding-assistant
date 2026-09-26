#!/usr/bin/env bash
# =============================================================================
# setup-doctor.sh — Strapi monorepo environment checker
#
# Checks that your local environment meets the prerequisites documented in
# target/strapi/AGENTS.md and target/strapi/package.json.
#
# READ-ONLY: this script never installs, modifies, or deletes anything.
#
# Usage: bash scripts/setup-doctor.sh
# =============================================================================

set -euo pipefail

# ── Colour helpers ────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

pass()  { echo -e "  ${GREEN}✅${RESET} $*"; }
fail()  { echo -e "  ${RED}❌${RESET} $*"; FAILED=$((FAILED + 1)); }
warn()  { echo -e "  ${YELLOW}⚠️ ${RESET} $*"; WARNED=$((WARNED + 1)); }
info()  { echo -e "  ${CYAN}ℹ️ ${RESET} $*"; }
header(){ echo -e "\n${BOLD}$*${RESET}"; }

FAILED=0
WARNED=0

# ── Node.js ───────────────────────────────────────────────────────────────────
#
# Version mismatch across sources:
#   AGENTS.md          → ≥22 ≤26
#   package.json       → >=20.0.0 <=26.x.x
#   CONTRIBUTING.md    → >= v22 and <= v26
#   .nvmrc             → 20
#
# This script uses the intersection that satisfies ALL documented sources:
#   NODE_MIN=22  (floor from AGENTS.md / CONTRIBUTING.md)
#   NODE_MAX=26  (ceiling from every source)
#
# Node 20 satisfies the package.json engine field but NOT AGENTS.md; a warning
# is emitted for 20.x so the user can make an informed choice.
#
NODE_MIN=22
NODE_MAX=26

header "1. Node.js (recommended: ≥${NODE_MIN} ≤${NODE_MAX} — see mismatch note below)"

if command -v node >/dev/null 2>&1; then
  NODE_VERSION_RAW="$(node --version)"                      # e.g. v22.3.0
  NODE_VERSION="${NODE_VERSION_RAW#v}"                      # strip leading 'v'
  NODE_MAJOR="${NODE_VERSION%%.*}"                          # e.g. 22

  if [[ "$NODE_MAJOR" -ge "$NODE_MIN" && "$NODE_MAJOR" -le "$NODE_MAX" ]]; then
    pass "Node.js ${NODE_VERSION_RAW} — within ≥${NODE_MIN} ≤${NODE_MAX}"
  elif [[ "$NODE_MAJOR" -eq 20 ]]; then
    warn "Node.js ${NODE_VERSION_RAW} — satisfies package.json engines (>=20) but"
    warn "  AGENTS.md and CONTRIBUTING.md both require >=22. You may hit bugs."
    warn "  Fix: nvm install 22 && nvm use 22   (or use fnm / mise)"
  elif [[ "$NODE_MAJOR" -lt "$NODE_MIN" ]]; then
    fail "Node.js ${NODE_VERSION_RAW} is below the minimum (v${NODE_MIN})"
    info "Fix: nvm install ${NODE_MIN} && nvm use ${NODE_MIN}"
  else
    fail "Node.js ${NODE_VERSION_RAW} exceeds the maximum (v${NODE_MAX})"
    info "Fix: nvm install ${NODE_MIN} && nvm use ${NODE_MIN}"
  fi
else
  fail "node not found in PATH"
  info "Fix: install Node.js via https://github.com/nvm-sh/nvm or https://github.com/Schniz/fnm"
  info "     then: nvm install ${NODE_MIN} && nvm use ${NODE_MIN}"
fi

echo
info "⚠️  Docs vs config mismatch (Node version):"
info "   AGENTS.md        → Node ≥22 ≤26"
info "   package.json     → >=20.0.0 <=26.x.x"
info "   CONTRIBUTING.md  → >= v22 and <= v26"
info "   .nvmrc           → 20"
info "   Safest choice: Node 22 LTS (satisfies every constraint)"

# ── Corepack ──────────────────────────────────────────────────────────────────
header "2. Corepack (required to activate Yarn 4)"

if command -v corepack >/dev/null 2>&1; then
  COREPACK_VERSION="$(corepack --version 2>/dev/null || echo 'unknown')"
  pass "corepack ${COREPACK_VERSION} — found"
  info "If 'yarn --version' still shows 1.x, run: corepack enable"
else
  fail "corepack not found in PATH"
  info "Fix: corepack is bundled with Node.js ≥16. Upgrade Node, then run: corepack enable"
fi

# ── Yarn ─────────────────────────────────────────────────────────────────────
#
# package.json "packageManager": "yarn@4.12.0"
# Corepack routes 'yarn' to the pinned version automatically once enabled.
#
YARN_REQUIRED_MAJOR=4
YARN_REQUIRED_FULL="4.12.0"

header "3. Yarn (required: ${YARN_REQUIRED_FULL} via Corepack)"

if command -v yarn >/dev/null 2>&1; then
  YARN_VERSION="$(yarn --version 2>/dev/null || echo 'unknown')"
  YARN_MAJOR="${YARN_VERSION%%.*}"

  if [[ "$YARN_VERSION" == "$YARN_REQUIRED_FULL" ]]; then
    pass "Yarn ${YARN_VERSION} — exact match"
  elif [[ "$YARN_MAJOR" == "$YARN_REQUIRED_MAJOR" ]]; then
    warn "Yarn ${YARN_VERSION} — major version is correct (${YARN_REQUIRED_MAJOR}) but"
    warn "  the pinned version is ${YARN_REQUIRED_FULL}. Corepack may auto-select the right"
    warn "  version inside the repo. Verify by cd-ing into the repo and running 'yarn --version'."
  elif [[ "$YARN_MAJOR" == "1" ]]; then
    fail "Yarn ${YARN_VERSION} (classic) — Yarn 4 is required"
    info "Fix: corepack enable"
    info "     Then cd into the repo and run 'yarn --version' — it should show ${YARN_REQUIRED_FULL}"
  else
    fail "Yarn ${YARN_VERSION} — expected major version ${YARN_REQUIRED_MAJOR}"
    info "Fix: corepack enable  (inside the repo, Corepack will enforce ${YARN_REQUIRED_FULL})"
  fi
else
  fail "yarn not found in PATH"
  info "Fix: corepack enable   (Corepack makes yarn available once Node is installed)"
fi

echo
info "Docs vs config mismatch (Yarn version):"
info "   CONTRIBUTING.md (line 55) → Yarn at v1.2.0+"
info "   package.json 'packageManager' → yarn@4.12.0"
info "   Installing Yarn 1 will fail — run 'corepack enable' so the correct Yarn 4 is used automatically."

# ── Git ────────────────────────────────────────────────────────────────────────
header "4. Git"

if command -v git >/dev/null 2>&1; then
  GIT_VERSION="$(git --version)"
  pass "${GIT_VERSION}"
else
  fail "git not found in PATH"
  info "Fix: install Git from https://git-scm.com/downloads"
fi

# ── Docker (optional) ─────────────────────────────────────────────────────────
#
# Only needed for Postgres or MySQL databases.
# docker-compose.dev.yml exposes:
#   Postgres → localhost:5432  (user/pass/db: strapi)
#   MySQL    → localhost:3306  (user/pass/db: strapi)
#
header "5. Docker (optional — only needed for Postgres / MySQL)"

if command -v docker >/dev/null 2>&1; then
  DOCKER_VERSION="$(docker --version 2>/dev/null || echo 'unknown')"
  pass "${DOCKER_VERSION} — found"

  # Check whether the Docker daemon is reachable (read-only probe)
  if docker info >/dev/null 2>&1; then
    pass "Docker daemon is running"
  else
    warn "Docker is installed but the daemon is not running"
    warn "Fix: start Docker Desktop (or run 'sudo systemctl start docker' on Linux)"
  fi

  # Check docker-compose / compose plugin
  if command -v docker-compose >/dev/null 2>&1; then
    DC_VERSION="$(docker-compose --version 2>/dev/null || echo 'unknown')"
    pass "docker-compose — ${DC_VERSION}"
  elif docker compose version >/dev/null 2>&1; then
    DC_VERSION="$(docker compose version 2>/dev/null || echo 'unknown')"
    pass "docker compose (plugin) — ${DC_VERSION}"
  else
    warn "Neither 'docker-compose' nor 'docker compose' found"
    warn "Fix: install Docker Compose — https://docs.docker.com/compose/install/"
  fi
else
  info "Docker not found — that is fine if you only plan to use SQLite"
  info "To use Postgres or MySQL: install Docker Desktop from https://www.docker.com/products/docker-desktop"
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo
echo -e "${BOLD}═══════════════════════════════════════${RESET}"
echo -e "${BOLD}Summary${RESET}"
echo -e "${BOLD}═══════════════════════════════════════${RESET}"

if [[ "$FAILED" -eq 0 && "$WARNED" -eq 0 ]]; then
  echo -e "  ${GREEN}${BOLD}All checks passed. You are ready to set up the repo.${RESET}"
  echo
  echo -e "  Next steps:"
  echo -e "    cd target/strapi"
  echo -e "    yarn install"
  echo -e "    yarn setup   # slow — 5-15 min"
  echo -e "    yarn ai:sync"
elif [[ "$FAILED" -eq 0 ]]; then
  echo -e "  ${YELLOW}${BOLD}${WARNED} warning(s), 0 errors.${RESET}"
  echo -e "  You can probably proceed, but review the warnings above."
else
  echo -e "  ${RED}${BOLD}${FAILED} error(s), ${WARNED} warning(s). Fix the errors above before continuing.${RESET}"
fi
echo

#!/bin/bash
set +x
# Define colors
RED=$'\e[0;31m'
GREEN=$'\e[0;32m'
CYAN=$'\e[0;36m'
NC=$'\e[0m' # No Color

# Force color output in subshells
export FORCE_COLOR=true

# Some programs need these env vars to enable color
export CLICOLOR=1
export CLICOLOR_FORCE=1

# Note: If colors still don't show, the program itself may need to be configured
# to force color output with its own flags (e.g. --color=always)

(pnpm dev | sed "s/^/${GREEN}[1]${NC} /") &
(pnpm deno:dev | sed "s/^/${CYAN}[2]${NC} /") &
wait

# (pnpm dev | sed 's/^/[1] /') &
# (pnpm deno:dev | sed 's/^/[2] /') &
# wait

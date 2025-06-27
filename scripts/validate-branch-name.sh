#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_PATTERN="^(feature|fix|release|docs|test|style|perf|chore)/[0-9]+-[a-z0-9-]+$"

if ! [[ $BRANCH_NAME =~ $BRANCH_PATTERN ]]; then
  echo "${RED}ERROR:${NC} Branch name '${YELLOW}$BRANCH_NAME${NC}' doesn't match the required pattern."
  echo "${YELLOW}Branch names must follow the format:${NC} ${GREEN}<type>/<task-number>-<description>${NC}"
  echo "${YELLOW}Allowed types:${NC} ${GREEN}feature, fix, release, docs, test, style, perf, chore${NC}"
  echo "${YELLOW}Example:${NC} ${GREEN}feature/44829-add-login-page${NC}"
  exit 1
fi

echo "${GREEN}SUCCESS: Branch name '${BRANCH_NAME}' is valid.${NC}"
exit 0

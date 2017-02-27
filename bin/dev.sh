#!/bin/bash

export NODE_ENV=development

DEV_CMD="babel-node app.js"

LINT_CMD="esw \
  --config .eslintrc.json \
  --ignore-path: ./.eslintignore \
  --cache \
  --quiet \
  --color \
  --watch"

echo $DEV_CMD
parallelshell "$DEV_CMD" "$LINT_CMD"

exit 0
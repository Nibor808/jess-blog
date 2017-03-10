#!/bin/bash

export NODE_ENV=development

DEV_SERVER_CMD="node app.js"

CLEAN_CMD="rimraf dist"

WEBPACK_CMD="webpack --config config/webpack.config.js --watch"

LINT_CMD="esw \
  --config config/.eslintrc.json \
  --cache \
  --quiet \
  --color \
  --watch"

echo $DEV_SERVER_CMD
parallelshell "$DEV_SERVER_CMD" "$CLEAN_CMD" "$WEBPACK_CMD" "$LINT_CMD"

exit 0
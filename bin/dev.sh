#!/bin/bash

export NODE_ENV=development

DEV_SERVER_CMD="node app.js"

CLEAN_CMD="rimraf dist"

WEBPACK_CMD="webpack --config config/webpack.config.js --watch"

echo $DEV_SERVER_CMD
parallelshell "$CLEAN_CMD" "$DEV_SERVER_CMD" "$WEBPACK_CMD"

exit 0
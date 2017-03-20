#!/bin/bash

export NODE_ENV=development

DEV_SERVER_CMD="nodemon server.js"

CLEAN_CMD="rimraf dist"

WEBPACK_CMD="webpack --config config/webpack.config.js"

echo $DEV_SERVER_CMD
parallelshell "$CLEAN_CMD" "$DEV_SERVER_CMD" "$WEBPACK_CMD"

exit 0
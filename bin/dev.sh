#!/bin/bash

export NODE_ENV=development

knex migrate:latest --knexfile config/knexfile.js

CLEAN_CMD="rimraf dist"

WEBPACK_CMD="webpack --config config/webpack.config.js"

echo $WEBPACK_CMD
parallelshell "$CLEAN_CMD" "$WEBPACK_CMD"

exit 0
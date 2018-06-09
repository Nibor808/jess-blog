#!/bin/bash

export NODE_ENV=production

mkdir ./build-prod

CP_IMAGES="cp -R images build-prod/images/"
CP_APP="cp app.js build-prod/"
CP_PACKAGE="cp package.json build-prod/"
CP_ASSETS="cp webpack-assets.json build-prod/"

echo 'Starting Production Build...'

WEBPACK_CMD="webpack --config webpack.config.js"

parallelshell "$CP_IMAGES" "$CP_APP" "$WEBPACK_CMD" "$CP_PACKAGE" "$CP_ASSETS"

exit 0

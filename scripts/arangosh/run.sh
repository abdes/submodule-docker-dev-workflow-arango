#!/bin/bash

pushd /var/lib/arangodb3-scripts
ARANGOSH="/usr/bin/arangosh"
LOG_LEVEL="info"
AUTHENTICATION="false"
SCRIPTS_DIR="arangosh"
INIT_SCRIPT="as-init.js"
APP_SCRIPT_PREFIX="as-app-";

CMD="$ARANGOSH --log.level $LOG_LEVEL --server.authentication $AUTHENTICATION "
CMD=$CMD" --javascript.execute $SCRIPTS_DIR/$INIT_SCRIPT"
for script in $SCRIPTS_DIR/$APP_SCRIPT_PREFIX*.js
do
  CMD=$CMD" --javascript.execute $script"
done

$CMD
popd

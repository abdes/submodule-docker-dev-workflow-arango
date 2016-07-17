#!/bin/bash

FOXX_MANAGER="/usr/bin/foxx-manager"
LOG_LEVEL="info"
AUTHENTICATION="false"
APPS_DIR="/var/lib/example-apps"
DATABASE_NAME="example"

pushd $APPS_DIR

CMD_BASE="$FOXX_MANAGER --log.level=$LOG_LEVEL --server.authentication=$AUTHENTICATION --server.database=$DATABASE_NAME"

echo "Replacing applications..."
$CMD_BASE list

for app in *
do
  if [ -d $app ]
  then
    zip -r /tmp/$app.zip $app
    CMD=$CMD_BASE" replace /tmp/$app.zip /$app"
    $CMD
  fi
done

$CMD_BASE list
popd

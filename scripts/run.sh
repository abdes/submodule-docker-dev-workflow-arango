#!/bin/bash
pushd /var/lib/arangodb3-scripts
. arangosh/run.sh
. foxx-manager/run.sh
popd

# Database submodule for the example app using the git submodule and docker developer workflow

see the top-level project at [https://github.com/abdes/submodule-docker-dev-workflow](https://github.com/abdes/submodule-docker-dev-workflow)

This submodule would contain the scripts to be used to populate the ArangoDB database for testing. If the application also relies on microservices implemented using Arango Foxx embedded engine, then such microservices implementation would be located here.

The docker compose descriptor would mount volumes for the database from this submodule directory.

## Setting up the db and the Foxx apps

```shell
docker exec -it developmentlocal_arangodb_1 /bin/bash /var/lib/arangodb3-scripts/run.sh
```

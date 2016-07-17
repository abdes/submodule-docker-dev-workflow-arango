# Database submodule for the example app using the git submodule and docker developer workflow

see the top-level project at [https://github.com/abdes/submodule-docker-dev-workflow](https://github.com/abdes/submodule-docker-dev-workflow)


## Table of Content
<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of Content](#table-of-content)
- [Dockerization considerations](#dockerization-considerations)
- [Setting up the db and the Foxx apps](#setting-up-the-db-and-the-foxx-apps)
- [Scripts and configuration data](#scripts-and-configuration-data)
- [Command line tool: arango-tools](#command-line-tool-arango-tools)

<!-- /TOC -->

## Dockerization considerations

This contains the scripts snd toold used to populate snd manage the ArangoDB
database for testing. If the application also relies on microservices implemented
using Arango Foxx embedded engine, then such microservices implementation would
be located here.

The docker compose descriptor would mount volumes for the database from this
submodule directory. In particular, for the development workflo to be efficient,
the foxx apps are directly mounted from the apps folder which has the same
structure than on the arangodb container.

```
├── apps
│   └── _db
│       ├── _system
│       └── example
│           └── hello
│               └── APP
│                   ├── index.js
│                   └── manifest.json
```

## Setting up the db and the Foxx apps

```shell
$ npm install -g
$ arango-tools init
$ arango-tools dev hello
```

or

```shell
$ npm install
$ npm run tools -- init
$ npm run tools dev hello
```

## Scripts and configuration data

To automate and simplify the setup of the database and the foxx microservices
running inside, the module offers a number of scripts and a command line tool
that can be used to execute the common operations during the development
workflow.

```
└── scripts
    ├── dev                         # scripts and files for dev environment
    │   ├── app-hello.js
    │   ├── config.js               # config data for the scripts
    │   ├── db-example.js
    │   └── index.js
    ├── prod                        # scripts and files for prod environment
    └── tools
        └── index.js                # helper command line tool
```

> The scripts configuration data must be consistent with the environment
> described in the docker-compose file. In particular the `projectName`
> paramter must be the same than what is used in `docker-compose` command
> with `-p` option:
> e.g. `docker-compose -p example up`

```js
{
  env: 'development',
  docker: {
    projectName: 'example',
    arango: {
      authentication: false,
      logLevel: 'debug',
      container: 'arangodb',
      port: 8529
    }
  },
  databases: [
    {
      name: 'example',
      script: 'db-example.js'
    }
  ],
  apps: [
    {
      name: 'hello',
      database: 'example',
      script: 'app-hello.js'
    }
  ]
}
```

## Command line tool: arango-tools

A command line has been built to encapsulate the common operations needed for
the development workflow. The tool is a node.js command line application.

```
Usage: arango-tools [options] [command]


Commands:

  init                    initialize arangodb with fresh database and apps
  enable-dev|dev <app>    enable development mode for an app
  enable-prod|prod <app>  enable production mode for an app

Options:

  -h, --help              output usage information
  -V, --version           output the version number
  -e --environment <env>  production | development
```

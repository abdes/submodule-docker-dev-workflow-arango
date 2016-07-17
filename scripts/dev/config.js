
module.exports = {
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
};

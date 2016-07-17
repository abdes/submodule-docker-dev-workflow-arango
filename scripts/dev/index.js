'use strict';

const path = require('path');
const config = require(path.join(__dirname, 'config'));

// Initialize databases
config.databases.forEach(
  function(database) {
    console.debug(
      'Using script [%s] to initialize database [%s]',
      database.script,
      database.name
    );
    require(path.join(__dirname, database.script))({name: database.name});
  }
);

// Initialize apps
config.apps.forEach(
  function(app) {
    console.debug(
      'Using script [%s] to initialize app [%s]',
      app.script,
      app.name
    );
    require(path.join(__dirname, app.script))({
      name: app.name,
      database: app.database
    });
  }
);

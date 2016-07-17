#!/usr/bin/env node

'use strict';


const program = require('commander');
const path = require('path');
const child_process = require('child_process');

const CONTAINER_SCRIPTS_PATH='/scripts';

program
  .version('0.0.1')
  .option('-e --environment <env>', 'production | development', /^(production|development)$/i, 'development');

program
  .command('init')
  .description('initialize arangodb with fresh database and apps')
  .action(function(){
    const config = loadConfig(program.environment);
    //console.log('init for %s ', program.environment);
    runArangoSh(config, CONTAINER_SCRIPTS_PATH+'/index.js');
  });

program
  .command('enable-dev <app>')
  .alias('dev')
  .description('enable development mode for an app')
  .action(function(app){
    const config = loadConfig(program.environment);
    console.log('set development mode for %s ', app);
    runFoxxManager(config, app, 'development');
  });

program.parse(process.argv);


function runArangoSh(config, script) {
  var cmd = [
    dockerRunCommand(config),
    '--name=arangosh',
    network(config),
    scriptsVolume(config),
    image(config),
    'arangosh',
    serverEndPoint(config),
    serverAuthentication(config),
    logLevel(config),
    '--javascript.execute='+script
  ].join(' ');
  console.log(cmd);
  child_process.execSync(cmd);
}

function runFoxxManager(config, app, command) {
  var cmd = [
    dockerRunCommand(config),
    '--name=foxxmanager',
    network(config),
    image(config),
    'foxx-manager',
    serverEndPoint(config),
    serverAuthentication(config),
    logLevel(config),
    serverDatabase(config, app),
    command,
    '/'+app
  ].join(' ');
  console.log(cmd);
  child_process.execSync(cmd);
}


function scriptsLocation(env) {
  return (env == 'production') ? 'prod' : 'dev';
}

function loadConfig(env) {
  return require('../'+scriptsLocation(env)+'/config');
}

function dockerRunCommand(config) {
  return 'docker run --rm';
}


function network(config) {
  return '--network='+config.docker.projectName+'_default';
}

function serverAuthentication(config) {
  return '--server.authentication='+config.docker.arango.authentication;
}

function image(config) {
  return 'arangodb/arangodb';
}

function scriptsVolume(config) {
  var localPath = path.join(__dirname, '..', scriptsLocation(config.env));
  return '-v '+path.normalize(localPath)+':'+CONTAINER_SCRIPTS_PATH;
}

function serverEndPoint(config) {
  return '--server.endpoint=tcp://'+config.docker.arango.container+':'+config.docker.arango.port;
}

function serverDatabase(config, app) {
  var appConfig = config.apps.filter(function ( obj ) {
      return obj.name === app;
  })[0];
  return '--server.database='+appConfig.database;
}

function logLevel(config) {
  return '--log.level='+config.docker.arango.logLevel;
}

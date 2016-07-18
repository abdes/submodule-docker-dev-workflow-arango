/**
 * # as-example-db.js
 *
 * Initialization script for the example DB, to be executed with arangosh.
 */
'use strict';


function _setDatabase(database) {
  db._useDatabase(database);
  console.info('Using database %s', database);
}

function _createCollection(collection) {
  var greets = db._collection(collection);

  if (greets) {
    console.info('Dropping collection [%s]', collection);
    db._drop(collection);
  }

  console.info('Creating collection [%s]', collection);
  greets = db._create(collection, {keyOptions: {
    type: 'autoincrement',
    allowUserKeys: false,
    offset: 1,
    increment: 1
  }});
  return greets;
}

function _populateGreetings(greets) {
  console.info('Populating collection [%s]', 'greetings');
  greets.save({message: 'Hello World!'});
  greets.save({message: 'Salutations!'});
  greets.save({message: 'Greetings Stranger!'});
  greets.save({message: 'How do you do?'});
  greets.save({message: 'Howdy!'});
  console.debug(
    'Collection [%s] now has [%i] entries',
    'greetings',
    greets.count()
  );
}

module.exports = function(config) {
  _setDatabase(config.database);
  _populateGreetings(_createCollection('greetings'));
};

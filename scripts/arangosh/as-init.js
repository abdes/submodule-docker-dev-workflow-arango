/**
 * # as-example-db.js
 *
 * Initialization script for the example DB, to be executed with arangosh.
 */
'use strict'

var EXAMPLE_DB_NAME = 'example';

// Check if the example database is already there and drop it, then create it
// // from scratch
db._useDatabase('_system');
var dbList = db._databases();
console.debug("Following databases are present: " + dbList);
if (dbList.indexOf(EXAMPLE_DB_NAME) > -1) {
  console.info("Dropping database " + EXAMPLE_DB_NAME);
  db._dropDatabase(EXAMPLE_DB_NAME);
}
console.info("Creating database " + EXAMPLE_DB_NAME + " and using it...");
db._createDatabase(EXAMPLE_DB_NAME);
db._useDatabase(EXAMPLE_DB_NAME);

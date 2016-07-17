/**
 * # as-example-db.js
 *
 * Initialization script for the example DB, to be executed with arangosh.
 */
'use strict'


module.exports = function(config) {
  // Check if the example database is already there and drop it, then create it
  // from scratch

  const name = config.name;

  db._useDatabase('_system');
  var dbList = db._databases();
  console.debug("The following databases are present:", dbList);
  if (dbList.indexOf(name) < 0) {
    console.info("Creating database [%s]", name);
    db._createDatabase(name);
  }
};

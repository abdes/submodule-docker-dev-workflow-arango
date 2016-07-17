/**
 * # as-example-db.js
 *
 * Initialization script for the example DB, to be executed with arangosh.
 */
'use strict'

const GREETINGS_COLLECTION_NAME = 'greetings';

var greets = db._collection(GREETINGS_COLLECTION_NAME);
if (greets) {
  console.info("Dropping collection " + GREETINGS_COLLECTION_NAME);
  db._drop(greets);
}
console.info("Creating collection " + GREETINGS_COLLECTION_NAME);
greets = db._create(GREETINGS_COLLECTION_NAME,
  {
    keyOptions: {
      type: 'autoincrement',
      allowUserKeys: false,
      offset: 1,
      increment: 1
    }
  }
);
console.info("Populating collection " + GREETINGS_COLLECTION_NAME);

greets.save({message: 'message 1'});
greets.save({message: 'message 2'});
greets.save({message: 'message 3'});
greets.save({message: 'message 4'});
greets.save({message: 'message 5'});

const all = greets.all().toArray();
console.debug("Collection", GREETINGS_COLLECTION_NAME, "now has", all.length, "documents");

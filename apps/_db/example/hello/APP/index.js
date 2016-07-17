'use strict';

const db = require('@arangodb').db;
const createRouter = require('@arangodb/foxx/router');

const router = createRouter();

const GREETINGS_COLLECTION_NAME = 'greetings';

const greets = db._collection(GREETINGS_COLLECTION_NAME);
const MAX_GREETINGS = greets.count();

router.get('/greet', function (req, res) {
  // generate a random integer between 1 and the max number of greetings
  const key = Math.floor(Math.random()*MAX_GREETINGS) + 1;
  console.info("Generated random number: ", key);
  const data = greets.document(key.toString());
  console.info(data);
  res.setHeader('Content-Type', 'application/json');
  // DO NOT use JSON.stringify here
  res.json(data);
})
.response(['application/json'], 'A random greeting.')
.summary('Random greeting')
.description('Returns a random greeting.');


module.context.use(router);

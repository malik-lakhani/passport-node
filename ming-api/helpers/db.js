const PoolCon = require('pg-pool');
const squel = require('squel').useFlavour('postgres');
const pg = require('pg');
const QueryStream = require('pg-query-stream');

// Set squel options
squel.cls.DefaultQueryBuilderOptions.autoQuoteFieldNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteTableNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = true;
squel.cls.DefaultQueryBuilderOptions.nameQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.tableAliasQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.fieldAliasQuoteCharacter = '"';

// Database Connection
const config = {
  host: process.env.PGDB_TCP_HOST || 'localhost',
  user: process.env.PGDB_USER || 'postgres',
  database: process.env.PGDB_DB || 'ming',
  password: process.env.PGDB_PASS || '',
  port: process.env.PGDB_TCP_PORT || 5432,
  max: 5, // max number of clients in the pool
  min: 1, // set min pool size to 1
  idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
};

const pool = new PoolCon(config);
// Export
module.exports = {
  executeQuery: function executeQuery(query) {
    return pool.query(query.text, query.values)
      .then(function (result) {
        return result.rows;
      });
  },
  builder: function () {
    return squel;
  },
  getQueryStream: function (query) {
    return new Promise(function (resolve, reject){
      var client = new pg.Client(config);
      client.connect(function(err) {
        if (err) {
          console.error('error', err.message, err.stack);
          reject(err);
        }
        var queryStream = new QueryStream(query.text, query.values);
        var stream = client.query(queryStream);
        stream.on('end', function (){
          client.end(function (err){
            if (err) reject(err);
          });
        });
        resolve(stream);
      });
    });
  }
};

const Pool = require('pg').Pool

const connection = new Pool({
  user: 'netuser',
  host: 'localhost',
  database: 'netdb',
  password: 'netpass',
  port: 5432,
})
module.exports = connection;
const Pool = require('pg').Pool

const connection = new Pool({
  user: 'dupham',
  host: 'localhost',
  database: 'resort_db',
  password: '1234567',
  port: 5432,
})
module.exports = connection;
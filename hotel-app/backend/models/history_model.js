var db = require('../database');
var history = {
    getById: function(id, callback) {
    return db.query('select id_room,book_table.id_customer,date_begin,date_end,rooms_table.name,price,size,capacity,pets,breakfast from book_table inner join customer_table on customer_table.id_customer = book_table.id_customer inner join rooms_table on rooms_table.id = book_table.id_room where book_table.id_customer = $1', [id], callback);
  }
};
module.exports = history;
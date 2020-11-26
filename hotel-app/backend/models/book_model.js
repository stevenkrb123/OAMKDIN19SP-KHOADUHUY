var db = require('../database');
var book = {
  get: function(callback) {
    return db.query('select * from book_table', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from book_table where id=$1', [id], callback);
  },
  add: function(book, callback) {
    console.log(book);
    return db.query(
      'insert into book_table (id_room,id_customer,date_begin,date_end) values ($1,$2,$3,$4)',
      [book.id_room,book.id_customer,book.date_begin,book.date_end],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from book_table where id_room=$1', [id], callback);
  },
  update: function(id, book, callback) {
    return db.query(
      'update book_table set id_room=$1,id_customer=$2,date_begin=$3,date_end=$4 where id=$5',
      [book.id_room,book.id_customer,book.date_begin,book.date_end, id],
      callback
    );
  },
  searchByName:function(value,callback) {
    var nameLike="%"+value+"%";
    return db.query('select * from book_table where bookname ILIKE $1 order by id desc',[nameLike], callback);
  },
  searchByType:function(value,callback) {
    var typeLike="%"+value+"%";
    return db.query('select * from book_table where type ILIKE $1 order by id desc',[typeLike], callback);
  }
};
module.exports = book;
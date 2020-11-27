var db = require('../database');
var room = {
  get: function(callback) {
    return db.query('select * from rooms_table order by id desc', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from rooms_table where id=$1', [id], callback);
  },
  add: function(room, callback) {
    console.log(room);
    return db.query(
      'insert into rooms_table (name,slug,type,price,size,capacity,pets,breakfast,featured,description,extras,images) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
      [room.name,room.slug,room.type,room.price,room.size,room.capacity,room.pets,room.breakfast,room.featured,room.description,room.extras,room.images],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from rooms_table where id=$1', [id], callback);
  },
  update: function(id, room, callback) {
    return db.query(
      'update rooms_table set name=$1,slug=$2,type=$3,price=$4,size=$5,capacity=$6,pets=$7,breakfast=$8,featured=$9,description=$10,extras=$11,images=$12 where id=$13',
      [room.bookname,room.slug,room.type,room.price,room.size,room.capacity,room.pets,room.breakfast,room.featured,room.description,room.extras,room.images, id],
      callback
    );
  },
  searchByName:function(value,callback) {
    var nameLike="%"+value+"%";
    return db.query('select * from rooms_table where bookname ILIKE $1 order by id desc',[nameLike], callback);
  },
  searchByType:function(value,callback) {
    var typeLike="%"+value+"%";
    return db.query('select * from rooms_table where type ILIKE $1 order by id desc',[typeLike], callback);
  }
};
module.exports = room;
var db = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var user = {
  get: function(callback) {
    return db.query('select * from customer_table', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from customer_table where name=$1', [id], callback);
  },
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        return db.query(
            'insert into customer_table (name,id_customer,email,password) values($1,$2,$3,$4)',
            [user.name, user.id_customer, user.email, hash],
            callback
        )
      }
    );
  },
  delete: function(id, callback) {
    return db.query('delete from customer_table where id_customer=$1', [id], callback);
  },
  update: function(id,user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        return db.query(
            'update customer_table set name=$1,id_customer=$2,email=$3,password=$4 where id=$5',
            [user.name, user.id_customer, user.email, hash,id],
            callback
        )
      }
    );
  },

  searchByName:function(value,callback) {
    var nameLike="%"+value+"%";
    return db.query('select * from customer_table where username ILIKE $1 order by id desc',[nameLike], callback);
  }
};
module.exports = user;
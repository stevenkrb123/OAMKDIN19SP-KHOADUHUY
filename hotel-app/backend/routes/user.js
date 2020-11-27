var express = require('express');
var router = express.Router();
var user = require('../models/user_model');
var db = require('../database');
const bcrypt = require('bcrypt');
const basicAuth = require('express-basic-auth');

function myAuthorizer(username, password, cb) {
  db.query('SELECT * FROM customer_table WHERE name = $1', [username],
    function (error, dbResults, fields) {
      if (dbResults.rows.length > 0) {
        bcrypt.compare(password, dbResults.rows[0].password, function (err, res) {
          if (res) {
            console.log("success");
            return cb(null, true);
          }
          else {
            console.log("wrong password");
            return cb(null, false);
          }
          response.end();
        });
      }
      else {
        console.log("user does not exists");
        return cb(null, false);
      }
    });
}

// router.use(basicAuth({users: { 'admin': '1234' }}))
//router.use()
router.get('/', function (req, res, next) {
  user.get(function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows.rows);
    }
  });
})


router.get('/:id?', basicAuth({ authorizer: myAuthorizer, authorizeAsync: true, }), function (req, res, next) {
  user.getById(req.params.id, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows.rows);
    }
  });
});


router.post('/', function (req, res, next) {
  user.add(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

router.delete('/:id', function (req, res, next) {
  user.delete(req.params.id, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function (req, res, next) {
  user.update(req.params.id, req.body, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/name/:value?', function (req, res, next) {
  user.searchByName(req.params.value, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows.rows);
    }
  });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var room = require('../models/room_model');

router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    room.getById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows.rows);
      }
    });
  } else {
    room.get(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows.rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  room.add(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

router.delete('/:id', function(req, res, next) {
  room.delete(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {
  room.update(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/name/:value?', function(req, res, next) {
  room.searchByName(req.params.value, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows.rows);
    }
  });
});

router.get('/type/:value?', function(req, res, next) {
  room.searchByType(req.params.value, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows.rows);
    }
  });
});

module.exports = router;
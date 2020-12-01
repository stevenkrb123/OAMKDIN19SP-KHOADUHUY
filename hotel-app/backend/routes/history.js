var express = require('express');
var router = express.Router();
var history = require('../models/history_model');


router.get('/:id?', function (req, res, next) {
    history.getById(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows.rows);
        }
    });
});

module.exports = router;
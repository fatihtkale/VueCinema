var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('hi brian');
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    res.render('Welcome to the coolest tec api')
});

module.exports = router;
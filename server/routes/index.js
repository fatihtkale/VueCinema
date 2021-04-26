var express = require('express');
var router = express.Router();
var { User } = require('../models')

router.get('/', async function(req, res, next) {
    let NewUser = await User.create({
        username: "req",
        password: "asdd",
        email: "req",
        shopname: "shopname"
    })
    res.send(NewUser)
});

module.exports = router;
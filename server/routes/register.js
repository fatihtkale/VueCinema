var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config')


var { User } = require('../models')

router.post('/', async function(req, res, next) {
    let NewUser = await User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    let token = jwt.sign({ id: NewUser.userid }, config.secret, { expiresIn: 86400 });
    res.status(200).send({ user: NewUser, token: token });
    console.log(config.secret)
});

module.exports = router;
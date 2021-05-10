var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config')

var { User, Userlogin } = require('../models')

router.post('/', async function(req, res, next) {
    var date = new Date();

    let newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: date
    })

    let newUserLogin = await Userlogin.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    
    let token = jwt.sign({ newUser, newUserLogin }, config.secret, { expiresIn: 86400 });
    
    res.status(200).send({ token });
});

module.exports = router;
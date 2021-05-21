var express = require('express');
var router = express.Router();
var { Userlogin } = require('../models')
const jwt = require('jsonwebtoken');
const config = require('../config')
const bcrypt = require('bcryptjs');

router.post('/', async function(req, res, next) {

    await Userlogin.findOne({ where: { username: req.body.username } })
    .then(function (users) {
        if (!users) {
            return res.send({ status: 'Incorrect username.' });
        }

        if (bcrypt.compareSync(req.body.password, users.password) == false) {
            return res.send({ status: 'Incorrect password.' });
        }

        let token = jwt.sign({ users }, config.secret, { expiresIn: 86400 });
        
        return res.status(200).send({token: token, status:'OK'});
    })
    .catch(err => console.log(err));
});

module.exports = router;
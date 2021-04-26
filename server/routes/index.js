var express = require('express');
var router = express.Router();
var { User } = require('../models')

router.get('/', async function(req, res, next) {

    //let newUser = await User.create({
    //    username: "DataTypes.STRING",
    //    password: "DataTypes.STRING",
    //    email: "DataTypes.STRING",
    //    shopname: "DataTypes.STRING"
    //})

    //res.send(newUser.username)

    res.send("hi")

});

module.exports = router;
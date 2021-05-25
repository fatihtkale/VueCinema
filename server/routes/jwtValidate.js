var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')

router.post('/', async function(req, res, next) {
    if (!req.body.token) {
        console.log("tom!")
        return res.send({ message: "empty", status: "error" });
    }

    jwt.verify(req.body.token, config.secret, (err, decoded) => {
        if (err) {
            console.log("invalid!")
            return res.send({ status: "error", message: "invalid!" });
        }
        console.log("Valid JWT!")
        return res.send({status: "OK", message: "Valid JWT"})
    });
});

module.exports = router;
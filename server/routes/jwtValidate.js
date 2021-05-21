var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')

router.post('/', async function(req, res, next) {
    if (!req.body.token) {
        return res.send({ message: "empty", status: "OK" });
    }

    jwt.verify(req.body.token, config.secret, (err, decoded) => {
        if (err) {
            return res.send({ status: "error", message: "invalid!" });
        }
        return res.send({status: "OK", message: "Valid JWT"})
    });
});

module.exports = router;
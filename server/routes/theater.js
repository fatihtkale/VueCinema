var express = require('express');
var router = express.Router();
const dayjs = require('dayjs') 

var { Theater } = require('../models')

router.get('/', async function(req, res, next) {
});

router.get('/:title', async function(req, res, next) {
});

router.post('/', async function(req, res, next) {
    await Theater.create({
        rowQty: req.body.normalrow,
        vipRowQty: req.body.viprow,
        hallId: req.body.selecthall,
        movieId: req.body.selectmovie
    }).then(result => {
        return res.send({result, status: "OK"})
    }).catch(err => {
        return res.send({err})
    })
});

router.put('/:id', async function(req, res, next) {
});

router.delete('/:title', async (req, res, next) => {
});

module.exports = router;
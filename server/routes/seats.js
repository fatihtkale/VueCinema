var express = require('express');
var router = express.Router();

var { CommonRows } = require('../models')

router.get('/', async function(req, res, next) {
});

router.get('/:id', async function(req, res, next) {
    await CommonRows.findAll({ where: { theaterId: req.params.id}})
    .then(result => {
        if (result) {
            return res.send({status: "OK", result})
        }
        return res.send({status: "ERROR"})
    }).catch(err => {
        console.log(err)
    })
});

router.post('/', async function(req, res, next) {
    await CommonRows.create({
        seat: req.body.seat,
        availability: req.body.availability,
        theaterId: req.body.theaterId,
    }).then(resp => {
        return res.send({ status: "OK" })
    }).catch(error => {
        return res.send({ status: "error", message: error })
    })
})

router.put('/:id', async function(req, res, next) {
})

router.delete('/:id', async (req, res, next) => {
})

module.exports = router;
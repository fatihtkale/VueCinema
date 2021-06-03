var express = require('express');
var router = express.Router();

var { Theater } = require('../models')

router.get('/', async function(req, res, next) {
    await Theater.findAll()
    .then(response => {
        res.send({response, status:"OK"})
    }).catch(err=> {
        res.send({err, status:"ERROR"})
    })
});

router.get('/:id', async function(req, res, next) {
    await Theater.findOne({ where: {theaterId: req.params.id}})
    .then(response => {
        console.log(req.params.id)
        res.send({response, status:"OK"})
    }).catch(err=> {
        res.send({err, status:"ERROR"})
    })
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
    await Theater.findOne({where:{ theaterId: req.params.id }})
    .then(async function(theater) {
        if (theater == null) { 
            return res.send({ message:"Theater findes ikke!", status: "ERROR" })
        }
        await Theater.update({
            rowQty: req.body.qty,
            vipRowQty: req.body.availabel,
            hallId: req.body.theaterId,
            movieId: req.body.movieId
        }, { 
            where:{
                theaterId: req.params.id
            }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
});

router.delete('/:id', async (req, res, next) => {
    await Theater.findOne({ where:{ theaterId: req.params.id }})
    .then(async function(theater) {
        if (!theater) {
            return res.send({ message:"Theater findes ikke!", status: "ERROR" })
        }
        await Theater.destroy({
            where:{ theaterId: theater.theaterId }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
});

module.exports = router;
var express = require('express');
var router = express.Router();

var { Hall } = require('../models')

router.get('/', async function(req, res, next) {
    await Hall.findAll()
    .then(function(result){
        return res.send({status: "OK", result})
    }).catch(function(err){
        return res.send({err})
    })
});

router.get('/:id', async function(req, res, next) {
    await Hall.findOne({ where: { hallId: req.params.id }})
    .then(function(result){
        if (result != null) {
            return res.send({status: "OK", result})
        }
        res.send({ status: "error" })
    }).catch(function(err){
        return res.send({err})
    })
});

router.post('/', async function(req, res, next) {
    await Hall.create({
        availability: req.body.availabel,
    }).then(resp => {
        return res.send({ status: "OK" })
    }).catch(error => {
        return res.send({ status: "error", message: error })
    })
})

router.put('/:id', async function(req, res, next) {
    await Hall.findOne({where:{ hallId: req.params.id }})
    .then(async function(hall) {
        if (hall == null) { 
            return res.send({ message:"hall findes ikke!", status: "ERROR" })
        }
        await Hall.update({
            qty: req.body.qty,
            availability: req.body.availabel,
            theaterId: req.body.theaterId
        }, { 
            where:{
                hallId: req.params.id
            }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
})

router.delete('/:id', async (req, res, next) => {
    await Hall.findOne({where:{ hallId: req.params.id }})
    .then(async function(hall) {
        if (!hall) {
            return res.send({ message:"Hall findes ikke!", status: "ERROR" })
        }
        await Hall.destroy({
            where:{ hallId: hall.hallId }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
})

module.exports = router;
var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");

var { Tickets } = require('../models')

router.get('/', async function(req, res, next) {
    await Tickets.findAll()
    .then(response => {
        res.send({response, status:"OK"})
    }).catch(err=> {
        res.send({err, status:"ERROR"})
    })
});

router.get('/:seat', async function(req, res, next) {
    await Tickets.findOne({ where: {[Op.and]:[ {rowId: req.params.seat.split('')[0]}, {seat: req.params.seat.split('')[1]} ]}})
    .then(response => {
        console.log(req.params.id)
        res.send({response, status:"OK"})
    }).catch(err=> {
        res.send({err, status:"ERROR"})
    })
});

router.post('/', async function(req, res, next) {
    await Tickets.create({
        hallId: req.body.hallId,
        movieId: req.body.movieId,
        theaterId: req.body.theaterId,
        rowId: req.body.rowId,
        seat: req.body.seat
    }).then(result => {
        return res.send({result, status: "OK"})
    }).catch(err => {
        return res.send({err})
    })
});

router.put('/:id', async function(req, res, next) {
    await Tickets.findOne({where:{ ticketId: req.params.id }})
    .then(async function(ticket) {
        if (ticket == null) { 
            return res.send({ message:"Ticket findes ikke!", status: "ERROR" })
        }
        await Tickets.update({
            hallId: req.body.hallId,
            movieId: req.body.movieId,
            theaterId: req.body.theaterId,
            rowId: req.body.rowId,
            seat: req.body.seat
        }, { 
            where:{
                ticketId: req.params.id
            }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
});

router.delete('/:id', async (req, res, next) => {
    await Tickets.findOne({ where:{ ticketId: req.params.id }})
    .then(async function(tickets) {
        if (!tickets) {
            return res.send({ message:"ticket findes ikke!", status: "ERROR" })
        }
        await Tickets.destroy({
            where:{ ticketId: tickets.ticketId }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
});

module.exports = router;
var express = require('express');
var router = express.Router();
const dayjs = require('dayjs') 

var { Movies, MovieAdmins } = require('../models')

router.get('/', async function(req, res, next) {
    await Movies.findAll()
    .then(async function(result){
        await MovieAdmins.findAll()
        .then(function(detailsResult){
            return res.send({status: "OK", result, detailsResult})
        })
    }).catch(function(err){
        return res.send({err})
    })
});

router.get('/:title', async function(req, res, next) {
    await Movies.findOne({ where: { movieTitle: req.params.title }})
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
    await Movies.findOne({where:{ movieTitle: req.body.title }})
    .then(async function(movie) {
        if (movie) {
            return res.send({ message:"Film med samme title eksister allerede!", status: "ERROR" })
        }
        await Movies.create({
            movieTitle: req.body.title,
            movieDescription: req.body.desc,
            movieRating: req.body.rate,
            movieGenre: req.body.genre,
            movieReleaseYear: req.body.release,
            movieAgeLimit: req.body.age,
            movieNextShow: dayjs(req.body.nextshow).toDate(),
            movieBanner: req.body.banner
        }).then(async () => {
            await MovieAdmins.create({
                movieView: 0,
                movieNextShow: dayjs(req.body.nextshow).toDate(),
                movieProfit: 0
            }).then(() => {
                return res.send({ status: "OK" })
            })
        }).catch(error => {
            return res.send({ status: "error", message: error })
        })
    })
})

router.put('/:id', async function(req, res, next) {
    await Movies.findOne({where:{ movieId: req.params.id }})
    .then(async function(movie) {
        if (movie == null) { 
            return res.send({ message:"Film findes ikke!", status: "ERROR" })
        }
        await Movies.update({
            movieTitle: req.body.title,
            movieDescription: req.body.desc,
            movieRating: req.body.rate,
            movieGenre: req.body.genre,
            movieReleaseYear: req.body.release,
            movieAgeLimit: req.body.age,
            movieNextShow: dayjs(req.body.nextshow).toDate()
        }, { 
            where:{
                movieId: req.params.id
            }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
})

router.delete('/:title', async (req, res, next) => {
    await Movies.findOne({where:{ movieTitle: req.params.title }})
    .then(async function(movie) {
        if (!movie) {
            return res.send({ message:"Film findex ikke!", status: "ERROR" })
        }
        await Movies.destroy({
            where:{ movieId: movie.movieId }
        }).then(resp => {
            res.send({ status: "OK" })
        }).catch(error => {
            res.send({ status: "error", message: error })
        })
    })
})

module.exports = router;
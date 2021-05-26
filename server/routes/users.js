var express = require('express');
var router = express.Router();
const dayjs = require('dayjs') 
const bcrypt = require('bcryptjs');
const authjwt = require('../auth')

const { Op } = require("sequelize");

var { User, Userlogin } = require('../models')

router.get('/', [authjwt.verifyToken], async (req, res, next) => {
    await Userlogin.findAll()
    .then(async function (users) {
        if (users) {
            await User.findAll().then(async function(user){
            if (user) {
                return res.send({ status: "OK", user: {user, users} });
            }
        })
        }else{
            return res.send({ status: "ERROR" })
        }
    })
})

// Get sepcific user
router.get('/:username', [authjwt.verifyToken], async (req, res, next) => {
    await Userlogin.findOne({ where: { username: req.params.username } })
    .then(async function (users) {
        if (users) {
            await User.findOne({where: { userId: users.id}}).then(async function(user){
                if (user) {
                    return res.send({ status: "OK", user: {user, users} });
                }
            })
        }else{
            return res.send({ status: "ERROR" });
        }
    })
})

// Update user
router.put('/:id', [authjwt.verifyToken], async (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    if (req.body.password.length == 0) {
        await Userlogin.update({
            username: req.body.username,
            email: req.body.email
        }, {
            where:{ 
                id: req.params.id
            }
        })
    }else{
        await Userlogin.update({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            email: req.body.email
        }, {
            where:{ 
                id: req.params.id
            }
        })
    }
    await User.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    },{
        where:{
            userId: req.params.id
        }
    })

    return res.send({status: "OK"});
})

// Create User
router.post('/', async (req, res, next) => {

    var salt = bcrypt.genSaltSync(10);
    
    await Userlogin.findOne({ where: { [Op.or]:[ {username: req.body.username}, {email: req.body.email} ]} })
    .then(async function (users) {
        if (users) {
            return res.send({ status: 'User already exists.' });
        }
        await Userlogin.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            admin: false
        })
        await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: dayjs(req.body.birthday).toDate()
        })
        return res.status(200).send({ status:'OK' });
    })
    .catch(err => console.log(err));
});

router.delete('/:id', [authjwt.verifyToken], async (req, res, next) => {
    await User.destroy({
        where: {
          userId: req.params.id
        }
    });
    await Userlogin.destroy({
        where: {
            id: req.params.id
        }
    })
    return res.send({ status: "OK" })
})

module.exports = router;
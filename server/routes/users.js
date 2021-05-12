var express = require('express');
var router = express.Router();
const dayjs = require('dayjs') 
const bcrypt = require('bcrypt');

const { Op } = require("sequelize");

var { User, Userlogin } = require('../models')

// Create User
router.post('/', async function(req, res, next) {

    await Userlogin.findOne({ where: { [Op.or]:[ {username: req.body.username}, {email: req.body.email} ]} })
    .then(async function (users) {
        if (users) {
            return res.send({ status: 'User already exists.' });
        }
        await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: dayjs(req.body.birthday).toDate()
        })
        await Userlogin.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        return res.status(200).send({ status:'OK' });
    })
    .catch(err => console.log(err));
    
});


module.exports = router;
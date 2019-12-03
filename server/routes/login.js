const express = require('express')
const router = express.Router()
const User = require('../db/User.js')
const jwt = require('jsonwebtoken')

//validates user, if user exists then return the _id of said user along with a jwt
router.post('/', async (req, res) => {
    //check if username and pass are there and strings
    if(!req.body.email || !req.body.password){
        res.status(401).send('Invalid payload, email or password not supplied')
        return
    }

    let user = await User.findOne({ email : req.body.email, password : req.body.password })

    if(!user){
        res.status(401).send('User with provided email does not exist')
        return
    }


    
})

// router.get('/',(req, res) => {
    //doesnt need a get
// })


module.exports = {router:  router, prefix: '/login'}
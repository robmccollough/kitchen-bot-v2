const express = require('express')
const router = express.Router()
const User = require('../db/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//validates user, if user exists then return the _id of said user along with a jwt
router.post('/', async (req, res) => {
    //check if username and pass are there and strings
    if(!req.body.email || !req.body.password){
        return res.status(401).send('Invalid payload, email or password not supplied')
        
    }

    let user = await User.findOne({email : req.body.email})

    if(!user){
        return res.status(401).send('User with provided email does not exist')
        
    }

    bcrypt.compare( req.body.password, user.password, (err, auth) => {
        if(err){
            return res.status(401).send({err: "Error in checking password", msg: err})
        }
        if(!auth){
            return res.status(401).send({err: "Invalid username or password"})
        }
        const token = jwt.sign({
            user_id : user._id,
            role: user.role 
        }, process.env.JWT_KEY)

        res.send({authenticated: true, token: token, data: {user_id: user._id, role: user.role}})
    })

})


module.exports = {router:  router, prefix: '/login'}
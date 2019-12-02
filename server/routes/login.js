const express = require('express')
const router = express.Router()
const User = require('../db/User.js')

router.post('/', (req, res) => {
    //check if username and pass are there and strings
    if(req.body.email && req.body.password ){
        User.findOne({ email : req.body.email, password : req.body.password }).then( result => {
            if(result){

                //maybe dont send the password back?
                res.send({
                    isAuthenticated: true,
                    user: result
                    // ,storeCookie: true
                    // ,jwt: 'something'
                })
            }else{
                res.send({
                    isAuthenticated: false,
                    user: result
                })
            }
        }).catch( err => res.send(err))
    }else{
        res.send('No credentials supplied')
    }
})

// router.get('/',(req, res) => {
    //doesnt need a get
// })


module.exports = {router:  router, prefix: '/login'}
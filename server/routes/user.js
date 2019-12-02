const express = require('express')
const router = express.Router()
const User = require('../db/User.js');
//add error checking on all these
//email cant already be used
router.post( '/', (req, res) => {
    // make sure email is not already in use
    User.find({email: req.body.email}).then( result => {
        if(result.length > 0){
            res.send({
                success: false,
                error: 'Email already in use'
            })
        }else{
            (new User(req.body)).save().then( result => {
                res.send({
                    success: true,
                    created_user: {
                        ...result
                    }
                }) 
            }).catch( err => res.send(err))  
        }
    })
}) 

router.post('/check', (req, res) => {
    User.findOne({email: req.body}).then( (result) => {
   
        res.send({
            in_use: result == null
        })
    
    }).catch( err => res.send(err))  
})
    

router.get( '/', (req, res) => {
    User.findOne({ _id : req.body.user_id}).then( result => {
        res.send(result)
    })
})

router.put( '/', (req, res) => {
    User.updateOne({ _id : req.body.user_id} , req.body.update).then( result => {
        res.send(result)
    }).catch( err => res.send(err))
})


module.exports =  {router : router, prefix : '/user'}

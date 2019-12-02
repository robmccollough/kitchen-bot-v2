const express = require('express')
const router = express.Router()
const User = require('../db/User.js');
//add error checking on all these
//email cant already be used
router.post( '/', (req, res) => {
    console.log(req.body);
    // somehow make sure email is not already in use

    (new User(req.body)).save().then( result => {
        if(result){
            res.send({
                success: true,
                created_user: {
                    ...result
                }
            })
        }else{
            res.send('Error creating user')
        }
    })
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

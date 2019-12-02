const express = require('express')
const router = express.Router()
const Request = require('../db/Request.js');

router.post( '/', (req, res) => {
    (new Request(req.body)).then( result => {
        res.send(result)
    }).catch(err => res.send(err))
})

router.get( '/', (req, res) => {
    Request.find().sort({created_at : -1}).limit(20).then( result => {
        res.send(result)
    }).catch( err => res.send(err))
})


module.exports =  {router : router, prefix : '/request'}
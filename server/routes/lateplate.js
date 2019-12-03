const express = require('express')
const router = express.Router()
const LatePlate = require('../db/LatePlate.js');

router.post('/', (req, res) => {
    (new LatePlate(req.body)).save().then(result => {
        res.send(result)
    })
})

router.get( '/', (req, res) => {
    let date = new Date().setDate(Date.now().getDate() - 1)
    LatePlate.find({ date : { $gt :  date}}).then( result => {
        res.send(result)
    })
})  


module.exports =  {router : router, prefix : '/lp'}
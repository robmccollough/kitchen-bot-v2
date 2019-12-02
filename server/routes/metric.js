const express = require('express')
const router = express.Router()
const Metric = require('../db/Metric.js');

router.put( '/', (req, res) => {

    switch(req.body.stat){
        case('asks'):  Metric.update({metric: req.body.metric}, { $inc : { "asks" : 1 }}).then( result => res.send(result)); break;
        case('total'): Metric.update({metric: req.body.metric}, { $inc : { "total" : 1 }}).then( result => res.send(result)); break;
        default: res.send('Metric Update Failed: Invalid stat parameter')
    }
   
})

// router.post( '/', (req, res) => {
//     (new Metric(req.body)).save().then( r => res.send(r))
// })


router.get( '/', (req, res) => {
    //always just send back all the metrics
    Metric.find().then( result => res.send(result)).catch( err => res.send(err))
})


module.exports =  {router : router, prefix : '/metric'}
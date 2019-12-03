const express = require('express')
const router = express.Router()
const Metric = require('../db/Metric.js');
const auth = require('../middlewares/auth.js');
const authAdmin = require('../middlewares/authAdmin.js')


//auth and admin role
router.put( '/', authAdmin , (req, res) => {

    switch(req.body.stat){
        case('asks'):  Metric.update({metric: req.body.metric}, { $inc : { "asks" : 1 }}).then( result => res.send(result)).catch( error => {
            res.send(error)
        }); break;
        case('total'): Metric.update({metric: req.body.metric}, { $inc : { "total" : 1 }}).then( result => res.send(result)).catch( error => {
            res.send(error)
        }); break;
        default: res.send('Metric Update Failed: Invalid stat parameter')
    }
   
})

router.get( '/', auth, (req, res) => {
    //always just send back all the metrics
    Metric.find().then( result => res.send(result)).catch( err => res.send(err))
})


module.exports =  {router : router, prefix : '/metric'}
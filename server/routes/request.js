const express = require('express')
const router = express.Router()
const Request = require('../db/Request.js');
const auth = require('../middlewares/auth.js')
const authAdmin = require('../middlewares/authAdmin.js')


//auth
router.post( '/', auth, (req, res) => {
    (new Request(req.body)).save().then( result => {
        res.send(result)
    }).catch(err => res.send(err))
})


//auth and admin
router.get( '/', authAdmin, (req, res) => {
    Request.find().sort({created_at : -1}).limit(20).then( result => {
        res.send(result)
    }).catch( err => res.send(err))
})


module.exports =  {router : router, prefix : '/request'}
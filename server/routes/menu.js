const express = require('express')
const router = express.Router()
const Menu = require('../db/Menu.js');
//possibly move db logic out of routing
router.post('/', (req, res) => {
    (new Menu({
        date: Date.now(),
        food: req.body.food
    })).save().then( (result) => {
        res.send(result)
    }).catch( (err) => {
        res.send(err)
    })
       
})

router.get('/',(req, res) => {
    Menu.findOne({}, {}, { sort: { 'date' : -1 } }, (err, doc) => {
        if(err){
            res.send({
                success: false,
                error: err
            })
        }        
        res.send({
            success: true,
            data: doc
        })
    }).catch( error => {
        res.send(error)
    })
})

//private endpoints resources
//sends last 10 || length
router.get('/all', (req, res) => {

    Menu.find().limit(req.body.limit || 10).then( result => {
        res.send(result)
    }).catch( err => res.send(err))
})

router.delete('/', (req, res) => {
    Menu.deleteOne({ _id : req.body.menu_id}).then( result => res.send(result)).catch( err => res.send(err))
})

module.exports = {router: router, prefix: '/menu'}
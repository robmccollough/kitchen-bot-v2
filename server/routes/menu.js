const express = require('express')
const router = express.Router()
const Menu = require('../db/Menu.js');
const auth = require('../middlewares/auth.js')
const authAdmin = require('../middlewares/authAdmin.js')

//possibly move db logic out of routing


router.post('/', authAdmin, (req, res) => {
    (new Menu({
        food: req.body.food
    })).save().then( (result) => {
        res.send(result)
    }).catch( (err) => {
        res.send(err)
    })
       
})

router.get('/', auth, (req, res) => {
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
//requires auth and admin role
router.get('/all', authAdmin, (req, res) => {

    Menu.find().limit(req.body.limit || 10).then( result => {
        res.send(result)
    }).catch( err => res.send(err))
})

router.delete('/', authAdmin, (req, res) => {
    Menu.deleteOne({ _id : req.body.menu_id}).then( result => res.send(result)).catch( err => res.send(err))
})

module.exports = {router: router, prefix: '/menu'}
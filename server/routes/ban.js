const express = require('express')
const router = express.Router()
const Ban = require('../db/Ban.js')

//posting of ban parameters:
//req.body : {
//     created_by :  Number (user_id of banner)
// 	   user_id : Number (user_id of banned)
//     ban_end : Date 
// 	   active : Boolean 
//     
// }
router.post('/', (req, res) => {

    (new Ban(req.body)).save().then(result => {
        res.send(result)
    }).error( error => {
        res.send(error)
    })
})  

router.get('/', (req, res) => {
    const {active, length} = req.body
    //length defaults to 10 if null
    if(active){
        Ban.find({ active: true }).sort({created_at : -1}).limit(length || 10).then( result => {
            res.send(result)
        })
    }else{
        Ban.find().sort({created_at : -1}).limit(length).then( result => {
            res.send(result)
        })
    }
})


module.exports = {router : router, prefix : '/ban'}
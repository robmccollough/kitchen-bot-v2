require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(require('body-parser').json())

const Menu = require('./db/Menu.js');
// const Chirp = require('../db/Chirp.js');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));


app.post('/api/menu/upload',  (req, res) => {
    console.log(req.body);

    (new Menu({
        date: Date.now(),
        food: req.body.food
    })).save().then( (result) => {
        console.log(result)
        res.send(result)
    }).catch( (err) => {
        console.log(err)
        res.send(err)
    })
       
})

app.get('/api/menu/get', (req, res) => {
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
    })
})



app.listen(port, () => {
    if (process.argv[2] === '--dev') {
        require('./dev').dev(port, process.env.LT_SUBDOMAIN);
    }
    console.log(`App listening on port ${port}!`)
})








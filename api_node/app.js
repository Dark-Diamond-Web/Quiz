const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');    
const Quiz = require('./API/Routes/Quiz');

app.use(cors());

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Test", {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connection Success!!")
    }
})

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
 
app.use('/api',Quiz);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Invalid response',
        status_code: '404'
    })
})

module.exports = app;
 
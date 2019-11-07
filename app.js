require('./models/db.js');
require('./config/passportConfig');

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require ('./routes/index.router.js');
var app = express();

//middleware
app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);
app.use((err,req,res,next)=>{
    if(err.name == 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.listen(process.env.PORT,function(){console.log('Server started at port:'+ process.env.PORT)});
require('../config/config.js');
var mongoose = require('mongoose');
require('./user.model.js');
require('./idea.model.js');
require('./comment.model.js');
require('./request.model.js');
require('./chat.model.js');

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }, (err) => {
    if(!err){
        console.log('MongoDB connection successful');
    }

    else{
        console.log('Error in mongoDB connection' + JSON.stringify(err,undefined,2));
    }
});
const mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({
    from:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    to:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'     
    }],
    idea:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea'     
    }],
    status:{
        type:String,
        default:"pending",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    ideaname:{
        type:String,
        required:true
    }
});

mongoose.model('Request',requestSchema);
module.exports = requestSchema;
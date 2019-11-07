const mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    sendId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    receiveId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'     
    }],
    message:{
        type:String,
        required:true
    },
    isViewed:{
        type:Boolean,
        required:true
    }
    
});

mongoose.model('Chat',chatSchema);
module.exports = chatSchema;
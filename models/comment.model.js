const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    username:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true     
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('Comment',commentSchema);
module.exports = commentSchema;
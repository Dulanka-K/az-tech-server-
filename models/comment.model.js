const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    content:{
        type:String,
        required:true     
    }
});

mongoose.model('Comment',commentSchema);
module.exports = commentSchema;
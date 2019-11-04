const mongoose = require('mongoose');

var ideaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:'Content can\'t be empty'     
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    upvotes:{
        default:0,
        type:Number
    },
    downvotes:{
        default:0,
        type:Number
    },
    username:{
        type:String,
        required:true
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'     
    }]
});

mongoose.model('Idea',ideaSchema);
module.exports = ideaSchema;


// user => accountType => 
// {/* <select>
//     <option value="user">User</option>
//     <option value="invester">Invester</option>
// </select> */}
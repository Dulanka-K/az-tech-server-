const mongoose = require('mongoose');

var ideaSchema = new mongoose.Schema({
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
        type:Number
    },
    downvotes:{
        type:Number
    },
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
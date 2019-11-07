const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');


const chat = mongoose.model('Chat');


module.exports.loadHistory=function(req,res){
    console.log("id:"+req.body.recieverId)
    console.log("rec:"+req.body.senderId)
    chat.find({$or:[{ sendId:req.body.senderId, receiveId:req.body.recieverId},{sendId:req.body.recieverId, receiveId:req.body.senderId}]}).then(
        result=>{
            res.json(result);
            console.log("res:",result)
        }
    ).catch(err=>{
        console.log("err:"+err)
    })

}

module.exports.saveMsg=function(req,res){
    var msg = new chat();
    
    msg.sendId=req.body.sendId;
    msg.receiveId=req.body.receiveId;
    msg.message=req.body.message;
    msg.isViewed=false;

    msg.save(function(err,doc,next){
        if(!err){
            res.send({success:true});
        }else{
            console.log(err)
        }
    })
}


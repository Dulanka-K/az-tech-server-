const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');

//load chat
module.exports.loadHistory=function(req,res){
    const receiver=req.body.recieverId;
    const sender=req.body.senderId;

    Chat.find({$or:[{ sendId:sender, receiveId:receiver},{sendId:receiver, receiveId:sender}]})
        .then(
            result=>{
                res.json(result);
            }
        ) 
        .catch(err=>{
            console.log("err:"+err)
        });

};

//send messages
module.exports.saveMsg=function(req,res){
    var chat = new Chat();
    
    chat.sendId=req.body.sendId;
    chat.receiveId=req.body.receiveId;
    chat.message=req.body.message;
    chat.isViewed=false;

    chat.save(function(err,doc,next){
        if(!err){
            res.send({success:true});
        }else{
            console.log(err)
        }
    });
};

//groupby
module.exports.groupByReceiver=function(req,res){
    Chat.aggregate([{ $group:{_id:"$receiveId"}}])
        .then(
            result=>{
                const r = res.json(result);
                
            }
        )
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//get unread messages
module.exports.setNotification=function(req,res,next){
    const receiver=req.params.receiveId;
    const sender=req.params.sendId;

    Chat.find({sendId:receiver,receiveId:sender, isViewed:false})
        .then(result=>{
            if(result){
                res.send(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//set a message as viewed
module.exports.setIsViewed=function(req,res,next){
    const receiver=req.params.receiveId;
    const sender=req.params.sendId;

    Chat.updateMany({ sendId:receiver,receiveId:sender }, {
        $set:{
            isViewed:true
            }
        })
        .then(result=>{
            if(result){
                res.send({success:true});
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

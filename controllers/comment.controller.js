const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Idea = mongoose.model('Idea');


//create new idea
exports.addComment=function(req,res,next){
    
    var comment = new Comment();
    
    const ideaId=req.params.iId;
    // comment.user=req.header('x-uId',req.params.uId);
    // comment.user=req.headers.uId;
    comment.user=req.params.uId;
    comment._id= new mongoose.Types.ObjectId();
    comment.content=req.body.content;

    comment.save(function(err,doc){
        if(!err){
            
            res.send(doc);
        }
        else{
            return next(err);
        }
    });
    
    Idea.findById(ideaId)
        .then(result=>{
            if(result){
                result.comment.push(comment._id);
                result.save();
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });

};
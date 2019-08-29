const mongoose = require('mongoose');
const Idea = mongoose.model('Idea');
const User = mongoose.model('User');


//create new idea
module.exports.addIdea=function(req,res,next){
    
    var idea = new Idea();
    
    const userId=req.params.uId;
    idea._id= new mongoose.Types.ObjectId();
    idea.content=req.body.content;
    // idea.upvotes=req.body.upvotes;
    // idea.downvotes=req.body.downvotes;
    // idea.comment=req.body.comment;
    
    idea.save(function(err,doc){
        if(!err){
            
            res.send(doc);
        }
        else{
            return next(err);
        }
    });
    
    User.findById(userId)
        .then(result=>{
            if(result){
                result.idea.push(idea._id);
                result.save();
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });

};

//get idea
module.exports.viewIdea=function(req,res,next){
    const userId=req.params.uId;

    User.findById(userId)
        .populate('idea')
        .select('idea')
        .then(result=>{
            if(result){
                res.json(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//delete idea
module.exports.removeIdea=function(req,res,next){
    const ideaId=req.params.iId;

    Idea.deleteOne({_id:ideaId})
        .then(result=>{
            if(result){
                res.json(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//edit idea content
module.exports.editIdea=function(req,res,next){
    const ideaId=req.params.iId;

    Idea.update({ _id:ideaId }, {
        $set:{
            content:req.body.content
            }
        })
        .then(result=>{
            if(result){
                res.json(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//update idea
module.exports.updateIdea=function(req,res,next){
    const ideaId=req.params.iId;
    // const content=req.body.content;
    
    // const comment={
    //     _id: new mongoose.Types.ObjectId(),
    //     content:content
    // };

    Idea.update({ _id:ideaId }, {
        $inc:{
            upvotes:1,
            downvotes:1
             }
        // $push:{
        //         comment:comment
        //     }
        })
        .then(result=>{
            if(result){
                res.json(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

// exports.postIdea = (req, res, next) => {
//     const userId = req.body.id;
//     const content = req.body.content;
//     const upvotes = req.body.upvotes;
//     const downvotes = req.body.downvotes;
//     const comment = req.body.comment;

//     console.log(userId);

//     const idea = {
//         content: content,
//         upvotes: upvotes,
//         downvotes: downvotes,
//         comment: comment
//     }

//     User.findById(userId)
//         .then(result => {
//             if(result) {
//                 result.idea.push(idea);
//                 result.save();
//             }
//         })
//         .catch(error => {
//             res.json({error: error});
//             console.log(error);
//         });

    
// }

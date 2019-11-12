const mongoose = require('mongoose');
const Idea = mongoose.model('Idea');
const User = mongoose.model('User');


//create new idea
module.exports.addIdea=function(req,res,next){
    
    var idea = new Idea();
    
    const userId=req.params.uId;
    idea._id= new mongoose.Types.ObjectId();
    idea.title=req.body.title;
    idea.content=req.body.content;
    idea.type=req.body.type;
    idea.category=req.body.category;
    idea.username=req.body.username;
    idea.value=req.body.value;
    idea.user.push(userId);
    
    idea.save(function(err,doc){
        if(!err){
            
            res.send({success:true});
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

//get idea using uId
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

//get idea using iId
module.exports.viewIdeaById=function(req,res,next){
    const ideaId=req.params.iId;

    Idea.findById(ideaId)
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

//view idea based on category
module.exports.categoryView=function(req,res,next){
    const category=req.params.category;

    Idea.find({category:category})
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

//private ideas
module.exports.privateIdeas=function(req,res,next){

    Idea.find({type:"private"})
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
                res.send({success:true});
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
                res.send({success:true});
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//upvote idea
module.exports.updateIdeaup=function(req,res,next){
    const ideaId=req.params.iId;
    // const content=req.body.content;
    
    // const comment={
    //     _id: new mongoose.Types.ObjectId(),
    //     content:content
    // };

    Idea.update({ _id:ideaId }, {
        $inc:{
            upvotes:1
             }
        // $push:{
        //         comment:comment
        //     }
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

//downvote idea
module.exports.updateIdeadown=function(req,res,next){
    const ideaId=req.params.iId;
    // const content=req.body.content;
    
    // const comment={
    //     _id: new mongoose.Types.ObjectId(),
    //     content:content
    // };

    Idea.update({ _id:ideaId }, {
        $inc:{
            downvotes:1
             }
        // $push:{
        //         comment:comment
        //     }
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

//boost idea
module.exports.boostIdea=function(req,res,next){
    const ideaId=req.params.iId;

    Idea.updateOne({ _id:ideaId }, {
        $set:{
            boostStatus:true
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

//get boosted ideas
module.exports.boostedIdeas=function(req,res,next){
    const status=req.params.status;

    Idea.find({boostStatus:status})
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

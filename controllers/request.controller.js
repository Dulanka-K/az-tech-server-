const mongoose = require('mongoose');
const Request = mongoose.model('Request');

module.exports.addRequest=function(req,res,next){

    var r = new Request();

    r.from=req.params.fId;
    r.to=req.params.tId;
    r.idea=req.params.iId;


    r.save(function(err,doc){
        if(!err){
            
            res.send({success:true});
        }
        else{
            return next(err);
        }
    });

};

//view requests
module.exports.requestView=function(req,res,next){
    const userId=req.params.uId;

    Request.find({to:userId})
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

//set status
module.exports.status=function(req,res,next){
    const userId=req.params.uId;

    Request.update({ to:userId }, {
        $set:{
            status:req.body.status
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

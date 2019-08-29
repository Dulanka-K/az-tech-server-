const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports.register=function(req,res,next){
    var user = new User();
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    user.email=req.body.email;
    user.password=req.body.password;
    user.userRole=req.body.userRole;
    

    user.save(function(err,doc){
        if(!err)
            res.send(doc);
        else{
            if(err.code == 11000)
            res.status(422).send(['Duplicate email found']);
            else
            return next(err);
        }
        
    });
};

module.exports.authenticate = (req, res, next) => {
    //call for passport authentication
    passport.authenticate( 'local' , (err,user,info)=>{
        //error from passport middleware
        if(err) return res.status(400).json(err);
        //registered user
        // const token = {
        //     name: user.name,
        //     accountType: user.accountType
        // }
        else if(user) return res.status(200).json({"token": user.generateJwt()});
        //unknown user or wrong password
        else return res.status(404).json(info);
    })(req,res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({_id: req._id},
    (err, user)=>{
        if(!user)
        return res.status(404).json({ status:false , message:'User record not found'});
        else
        return res.status(200).json({ status:false , user: _.pick(user, ['fullName','email']) });
    });
}

module.exports.editProfile=function(req,res,next){
    const userId=req.params.uId;

    User.update({ _id:userId }, {
        $set:{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            organisation:req.body.organisation,
            country:req.body.country
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

//generate random hexadecimal number for verifications
module.exports.generateRandomNumber=function(req, res, next) {
    const len = 7;
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString('hex')
      .slice(0, len) 
}  

module.exports.generateRandomPassword=function(req, res, next) {
    const len = 10;
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len)
}

//change password
module.exports.resetPassword=function(userId, newPassword){
    bcrypt.hash(newPassword, 10, (err, hash) => {
        if(err){
            console.log(err)
            return err;
        }else {
            console.log(hash)
            User
                .update({ _id: userId },{$set: { password: hash }})
                .then(result => {
                    console.log(result)
                })

        }
    });
}
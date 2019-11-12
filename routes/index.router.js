const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const ctrlUser = require('../controllers/user.controller.js');
const jwtHelper = require('../config/jwtHelper');
const idea = require('../controllers/idea.controller.js');
const comment = require('../controllers/comment.controller.js');
const image = require('../controllers/upload.controller.js');
const emailController = require('../controllers/email.controller');
const requests = require('../controllers/request.controller.js');
const chat = require('../controllers/chat.controller.js');
const bcrypt = require('bcryptjs');



//user routes
router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile/:uId',ctrlUser.userProfile);
router.put('/editProfile/:uId',ctrlUser.editProfile);
router.delete('/removeUser/:uId',ctrlUser.removeUser);
router.get('/viewAllUsers/:role',ctrlUser.viewAllUsers);//view ideas under categories
router.get('/resetPassword/:uId/:password',ctrlUser.resetPassword);//save new password in db

router.post('/userImageUpload/:userId', image.userImageUpload.single('image'),(req, res, next)=>{
    const userId = req.params.userId;
    
    User
        .find({_id:userId})
        .exec()
        .then(user => {
            cloudinary.uploader.upload(req.file.path, function(result) {
                imageSecureURL = result.secure_url;
                console.log(imageSecureURL);
                user[0].imageURL = imageSecureURL;
                user[0]
                    .save()
                    .then(result => {
                        res.status(200).json({
                            state: true,
                            imageURL: imageSecureURL
                        }) 
                    })
            });
        })
        .catch(err => {
            res.status(401).json({
                state: false
            })
        })
});//image upload

//idea routes
router.post('/addidea/:uId',idea.addIdea);
router.get('/viewidea/:uId',idea.viewIdea);
router.get('/viewideabyid/:iId',idea.viewIdeaById);//view idea by iId
router.delete('/deleteidea/:iId',idea.removeIdea);
router.put('/editidea/:iId',idea.editIdea);//edit content
router.put('/updateideaup/:iId',idea.updateIdeaup);//upvote
router.put('/updateideadown/:iId',idea.updateIdeadown);//downvote
router.get('/categoryview/:category',idea.categoryView);//view ideas under categories
router.get('/privateideas',idea.privateIdeas);

//comment routes
router.post('/addComment/:iId/:uId',comment.addComment);
router.get('/viewComment/:iId',comment.viewComment);
router.delete('/deletecomment/:cId',comment.removeComment);

//request routes
router.post('/sendRequest/:fId/:tId/:iId',requests.addRequest);//send request
router.get('/viewRequest/:uId',requests.requestView);//view requests
router.put('/status/:uId/:rId',requests.status);//accept or reject
router.get('/investedideas/:uId',requests.investedIdeas);//view ideas invested
router.get('/requeststatus/:uId/:iId',requests.requeststatus);
router.get('/requestByIdea/:iId',requests.requestByIdea);

//boost
router.put('/boost/:iId',idea.boostIdea);
router.get('/boostedIdeas/:status',idea.boostedIdeas);

//chat route
router.post('/loadHistory',chat.loadHistory);
router.post('/saveMsg',chat.saveMsg);
router.get('/groupById',chat.groupByReceiver);
router.get('/unreadMessages/:receiveId/:sendId',chat.setNotification);
router.post('/setMsgStatus/:receiveId/:sendId',chat.setIsViewed);


//after verifying the email this can save new password of the password forgotten person
router.get('/forgotPassword/:email', (req, res, next) => {
    userEmail = req.params.email;
    User
        .find({ email: userEmail })
        .exec()
        .then(user => {  
            if(user){
                console.log(user[0]._id)
                const newPassword = ctrlUser.generateRandomPassword()
                console.log(newPassword);
                ctrlUser.resetPassword(user[0]._id, newPassword)
                emailController.sendNewPassword(userEmail, newPassword);
                    res.status(200).json({
                        state: true,
                        password: newPassword
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                error: err,
                state: false
            })
        })
});

//send warn email to user
router.get('/warn/:email', (req, res, next) => {
    console.log("back end")
    if(!req.params.email){
        res.status(401).json({
            state: false
        })
    } else {  
        const userEmail = req.params.email;
        console.log(userEmail);
        
                    emailController.sendemail(userEmail);
            
    }

}

);

router.put('/editUserProfile/:userId', (req, res, next) => {
    console.log("User profile edit route");
    const userId = req.params.userId;
    const currentPassword = req.body.password;
    console.log(currentPassword);
    // const thispassword;
    User
        .findById(userId)
        .exec()
        .then(user => {
            console.log(user);
            savedPassword = user.password;
            console.log(savedPassword);
            bcrypt.compare(currentPassword,savedPassword, (err, result) => {
                if(result){
                        // console.log("LLLLLLLL")
                    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                        if(err){
                            return res.status(500).json({     
                            });
                        }else {
                            
                          //  console.log("KKKKKKKKK");
                            User.update({_id:userId},{
                                $set:{
                                //    fname: req.body.fname ,
                                //    lname:req.body.lname , 
                                   password:hash 
                                }
                            })
                            .then(result=>{
                                res.status(200).json({
                                    state:true,
                                    user:result
                                })

                            })
                            .catch(err=>{
                                res.json(err);
                            })
                               
                               
                        }


                    })
  }


                   
                 else {
                   // console.log("PPPPPPPPP");
                    res.status(500).json({
                        state: false,
                        msg:"incorrect password"

                       
                    })
                }
            })
        })
           .catch(err=>{
                 res.status(500).json({
                    error:err,
                    msg:"User not exit"
                })
          })
})

module.exports = router;

//req.file.path
//image.userImageUpload.single('image'),
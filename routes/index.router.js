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


//user routes
router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile/:uId',ctrlUser.userProfile);
router.put('/editProfile/:uId',ctrlUser.editProfile);

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

//comment routes
router.post('/addComment/:iId/:uId',comment.addComment);
router.get('/viewComment/:iId',comment.viewComment);
router.delete('/deletecomment/:cId',comment.removeComment);

//request routes
router.post('/sendRequest/:fId/:tId/:iId',requests.addRequest);//send request
router.get('/viewRequest/:uId',requests.requestView);//view requests
router.put('/status/:uId',requests.status);//accept or reject

//send reset password email to user
router.get('/forgotPassword/:email', (req, res, next) => {
    if(!req.params.email){
        res.status(401).json({
            state: false
        })
    } else {  
        const userEmail = req.params.email;
        console.log(userEmail);
        User 
            .find({ email: userEmail })
            .exec()
            .then(user => {
                if(user){
                    console.log(user[0]._id);
                    const verificationCode = ctrlUser.generateRandomNumber()
                    console.log(verificationCode);
                    emailController.sendVerificationCode(userEmail, verificationCode);
                    
                    res.status(200).json({
                        state: true, 
                        userId: user[0]._id,
                        code: verificationCode
                    })
                } else {  
                    res.status(500).json({ 
                        state: false,
                        Message: "Not Registered User"
                    })
                }
            }) 
            .catch(err => {
                console.log(err);    
                res.status(500).json({
                    state: false
                })
            })
    }
});

//after verifying the email this can save new password of the password forgotten person
router.get('/newPassword/:email', (req, res, next) => {
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
})

module.exports = router;

//req.file.path
//image.userImageUpload.single('image'),
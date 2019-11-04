const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[4,'Password must be at least 4 characters long!']
    },
    role:{
        type:String,
        required:true
    },
    organisation:{
        type:String
    },
    country:{
        type:String
    },
    imageURL:{
        type:String
    },
    idea:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea'
    }]
});



userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'Invalid e-mail');


// userSchema.pre('save',async function(next){
//     const salt = await bcrypt.genSalt(10);
//     this.password =  await bcrypt.hash(this.password,salt);
//     next();
// });

//methods
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({ _id: this._id, role:this.role, firstName:this.firstName, lastName:this.lastName },
    process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User',userSchema);
module.exports = userSchema;

// userSchema.pre('save',function(next){
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash(this.password,salt,(err,hash)=>{
//             this.password=hash;
//             // this.saltSecret=salt;
//             next();
//         });
//     });
// });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        minlength:3,
        maxlength:40,
        required:[true,'Please provide a valid username'],
        unique:true
    },
    profileUrl:{
        type:String,
    },
    password:{
        type:String,
        minlength:4,
        required:[true,'Please provide a valid password'],
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide email'],
        unique:true 
    },
    //other users likes 
    totalLikes:{
        type:Number,
        default:0
    },
    //other users dislikes
    totalDislikes:{
        type:Number,
        default:0
    },
    totalShares:{
        type:Number,
        default:0
    },
    posts:[{type:mongoose.Types.ObjectId,}],
   
},{timestamps:true});

UserSchema.pre('save',async function (){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);

    this.password=hashedPassword;
});

UserSchema.statics.comparePassword = async function (canditatePassword,userPassword){
    const match = await bcrypt.compare(canditatePassword,userPassword);
    return match;
}
UserSchema.statics.generateJWT = function (userId) {
    const token = jwt.sign({userId},process.env.JWT_ENCRYPTION,{expiresIn:process.env.JWT_LIFETIME});
    return token;
}

module.exports = mongoose.model('User',UserSchema);
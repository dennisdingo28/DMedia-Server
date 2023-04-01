const UserSchema = require('../models/User');

async function extractUser(req,res,next){
    try{
        const authUser = req.user;
        const user = await UserSchema.findById({_id:authUser.userId}).select("-password");
        console.log(user);
        res.status(200).json({user,good:true});
    }catch(err){
        console.log(err);
    }
}

module.exports = extractUser;

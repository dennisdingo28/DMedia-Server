const UserSchema = require('../models/User');
const {BadRequest} = require("../errors/");

async function extractUser(req,res,next){
    try{
        const authUser = req.user;
        const user = await UserSchema.findById({_id:authUser.userId}).select("-password");
        if(!user)
            throw new BadRequest(`Cannot find any users with the user id of ${userId}`);
        res.status(200).json({user,good:true});
    }catch(err){
        next(err);
    }
}

module.exports = extractUser;

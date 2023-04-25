const UserSchema = require('../models/User');
const {BadRequest} = require("../errors/");

async function extractUser(req,res,next){
    try{
        const {decodedInfo} = req.user;

        console.log(decodedInfo);
        const user = await UserSchema.findById({_id:decodedInfo.userId}).select("-password");
        if(!user)
            throw new BadRequest(`Cannot find any users with the user id of ${decodedInfo.userId}`);
        res.status(200).json({user,good:true});
    }catch(err){
        next(err);
    }
}

module.exports = extractUser;

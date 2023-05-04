const UserSchema = require('../models/User');
const {BadRequest} = require('../errors/');

const updateUser = async (req,res,next)=>{
    try{
        const {id}=req.params;
        const {totalPostLikes,totalPostDislikes,defaultLikes,defaultDislikes,totalShares,posts}=req.body;
        
        const targetUser = await UserSchema.findById({_id:id});

        let userPropsObject = {

        }

        if(totalPostLikes!==undefined){
            if(totalPostLikes>defaultLikes)
                userPropsObject.totalLikes = targetUser.totalLikes+1;
            else if(totalPostLikes<defaultLikes)
                userPropsObject.totalLikes = targetUser.totalLikes-1;
            else
                userPropsObject.totalLikes = targetUser.totalLikes;
        }

        if(totalPostDislikes!==undefined){
            if(totalPostDislikes>defaultDislikes)
                userPropsObject.totalDislikes = targetUser.totalDislikes+1;
            else if(totalPostDislikes<defaultDislikes)
                userPropsObject.totalDislikes = targetUser.totalDislikes-1;
            else
                userPropsObject.totalDislikes = targetUser.totalDislikes;
        }


        if(totalShares!==undefined)
            userPropsObject.totalShares=totalShares;
        if(posts!==undefined)
            userPropsObject.posts=posts;

        console.log(userPropsObject);

        const user = await UserSchema.findByIdAndUpdate({_id:id},userPropsObject,{new:true,runValidators:true})
        
        if(!user){
            throw new BadRequest(`Cannot find and update any user with the id of ${id}`);
        }

        res.status(201).json(user);

    }catch(err){
        next(err);
    }
}


module.exports = {updateUser};
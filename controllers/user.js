const UserSchema = require('../models/User');
const {BadRequest} = require('../errors/');

const updateUser = async (req,res,next)=>{
    try{
        const {id}=req.params;
        const {totalLikes,totalDislikes,totalShares,posts}=req.body;

        console.log(req.body);
        
        let userPropsObject = {

        }

        if(totalLikes!==undefined)
            userPropsObject.totalLikes=totalLikes;
        if(totalDislikes!==undefined)
            userPropsObject.totalDislikes=totalDislikes;
        if(totalShares!==undefined)
            userPropsObject.totalShares=totalShares;
        if(posts!==undefined)
            userPropsObject.posts=posts;

        
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
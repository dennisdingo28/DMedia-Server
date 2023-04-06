const PostSchema = require('../models/Post');
const {BadRequest} = require('../errors/');

const createPost = async(req,res,next) =>{
    try{
        const decodedInfo = req.user;

        const postProps = {...req.body,createdBy:decodedInfo.userId};

        const post = await PostSchema.create(postProps);
        
        if(!post)
            throw new BadRequest("Cannot create your post.Please try again later.");
        
        res.status(201).json({msg:"Post was successfully created",good:true});
    }catch(err){
        next(err);
    }
}

module.exports = {createPost};
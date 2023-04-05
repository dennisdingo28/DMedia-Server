const PostSchema = require('../models/Post');
const {BadRequest} = require('../errors/');

const createPost = async(req,res,next) =>{
    try{
        const post = await PostSchema.create(req.body);
        
        if(!post)
            throw new BadRequest("Cannot create your post.Please try again later.");
        
        res.status(201).json({msg:"Post was successfully created",good:true});
    }catch(err){
        next(err);
    }
}

module.exports = {createPost};
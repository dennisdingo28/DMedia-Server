const PostSchema = require('../models/Post');
const {BadRequest} = require('../errors');

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

const updatePost = async (req,res,next)=>{
    try{
        console.log('user hits the server');
        const postObject = req.params;
        console.log(req.body);

        const {nrLikes,nrDislikes} = req.body;

        const likes = nrLikes;
        const dislikes = nrDislikes;

        const postId = postObject.id;

        if(!postId)
            throw new BadRequest("You must provide a post id in order to update it");

        const targetPost = await PostSchema.findByIdAndUpdate({_id:postId},{likes,dislikes},{new:true,runValidators:true});

        if(!targetPost)
            throw new BadRequest(`Cannot find any post with the id of ${postId}`);
        
        res.status(201).json(targetPost);
    }catch(err){
        next(err);
    }
}



module.exports = {createPost,updatePost};
const PostSchema = require('../models/Post');
const UserSchema = require('../models/User');
const {BadRequest} = require('../errors');
const axios = require('axios');

const createPost = async(req,res,next) =>{
    try{
        const {decodedInfo} = req.user;

        const postProps = {...req.body,createdBy:decodedInfo.userId};

        const post = await PostSchema.create(postProps);
        
        if(!post)
            throw new BadRequest("Cannot create your post.Please try again later.");
        
        res.status(201).json({msg:"Post was successfully created",good:true,post:post});
    }catch(err){
        next(err);
    }
}

const sharePost = async(req,res,next)=>{
    try{
        const {decodedInfo,token} = req.user;

        const {id}=req.params;

        const {user,createdBy} = req.body;

        const targetPost = await axios.get(`http://localhost:5000/search/post/${id}`);
        console.log(targetPost);

        if(!targetPost)
            throw new BadRequest(`Cannot share any post with id of ${id}`);
        
        const updateProps={
            share:{initialUserId:targetPost.data.share.initialUserId,sharedBy:[...targetPost.data.share.sharedBy,user._id]}
        }

        const updatedPost = await axios.patch(`http://localhost:5000/post/updatePost/${id}`,updateProps,{headers:{authorization:`Bearer ${token}`}});

        const updatedUser = await axios.patch(`http://localhost:5000/user/${user._id}`,{posts:[...user.posts,id]}, {headers:{authorization:`Bearer ${token}`}});

    }catch(err){
        next(err);
    }
}

const updatePost = async (req,res,next)=>{
    try{
        console.log('user hits the server');
        const postObject = req.params;
        console.log(req.body);

        let postPropsObject = {}

        const {numberOfLikes,numberOfDislikes,comments,share} = req.body;

        const likes = numberOfLikes;
        const dislikes = numberOfDislikes;

        const postId = postObject.id;

        if(!postId)
            throw new BadRequest("You must provide a post id in order to update it");

        if(likes!==undefined){
            postPropsObject.likes = likes;
        }
        if(dislikes!==undefined){
            postPropsObject.dislikes=dislikes;
        }

        if(comments!==undefined)
        {
            postPropsObject.comments = comments;
        }

        if(share!==undefined)
        {
            postPropsObject.share=share;
        }
        
        const targetPost = await PostSchema.findByIdAndUpdate({_id:postId},postPropsObject,{new:true,runValidators:true});

        if(!targetPost)
            throw new BadRequest(`Cannot find any post with the id of ${postId}`);
        
        res.status(201).json(targetPost);
    }catch(err){
        next(err);
    }
}



module.exports = {createPost,updatePost,sharePost};
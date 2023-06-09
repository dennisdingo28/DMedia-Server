const UserSchema = require("../models/User");
const PostSchema = require('../models/Post');

const {BadRequest,NotFound} = require("../errors");

const searchUser = async (req,res,next)=>{
    try{
        const {username} = req.query;

        if(!username)
            throw new BadRequest("You must provide an username");
        const targetUser = await UserSchema.find({username:{$regex:username,$options:'i'}}).select('-password');

        if(targetUser.length==0)
            throw new NotFound(`Cannot find a user with the name of ${username}`);

        res.status(200).json(targetUser);
    }catch(err){
        next(err);
    }
};

const searchUserById = async (req,res,next)=>{
    try{
        const userObject=req.params;
        const user = await UserSchema.findById({_id:userObject.userId}).select('-password');
        if(!user)
            throw new BadRequest(`Cannot find any user with the id of ${userObject.userId}`);

        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

const searchAllPosts = async (req,res,next)=>{
    try{
        const posts = await PostSchema.find({}).select('-likes').select('-dislikes');
        if(posts.length==0)
            throw new NotFound('Cannot get any posts.');
        res.status(200).json(posts);
    }catch(err){
        next(err);
    }
};

const searchPostById = async(req,res,next)=>{
    try{
        const {id}=req.params;
        const targetPost = await PostSchema.findById({_id:id}).select("-password");

        if(!targetPost)
            throw new BadRequest(`Cannot find any post with the id of ${id}`);

        res.status(200).json(targetPost);
    }catch(err){
        next(err);
    }
}

const searchPost = async(req,res,next)=>{
    try{
        const {createdBy,initialShareUserId}=req.query;
        console.log(req.query);

        const targetPost = await PostSchema.findOne({createdBy:createdBy,share:{initialUserId:initialShareUserId}});

        if(!target)
            throw new BadRequest(`Cannot find any post with the following details: createdBy:${createdBy} and initialShare:${initialShareUserId}`);
        res.status(200).json({post:targetPost,good:true});    
    }catch(err){
        next(err);
    }
}

module.exports = {searchUser,searchUserById,searchAllPosts,searchPostById,searchPost};
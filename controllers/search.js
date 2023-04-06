const UserSchema = require("../models/User");
const PostSchema = require('../models/Post');

const {BadRequest,NotFound} = require("../errors");

const searchUser = async (req,res,next)=>{
    try{
        const {username} = req.query;

        if(!username)
            throw new BadRequest("You must provide an username");
        const targetUser = await UserSchema.find({username:{$regex:username,$options:'i'}});

        if(targetUser.length==0)
            throw new NotFound(`Cannot find a user with the name of ${username}`);

        res.status(200).json(targetUser);
    }catch(err){
        next(err);
    }
};

const searchAllPosts = async (req,res,next)=>{
    try{
        const posts = await PostSchema.find({});
        if(posts.length==0)
            throw new NotFound('Cannot get any posts.');
        res.status(200).json(posts);
    }catch(err){
        next(err);
    }
};



module.exports = {searchUser,searchAllPosts};
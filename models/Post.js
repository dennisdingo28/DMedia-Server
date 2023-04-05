const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
    },
    imageAlt:{
        type:String,
    },
    imageWidth:{
        type:Number,
    },
    imageHeight:{
        type:Number
    },
    createdBy:{
        type:mongoose.Types.ObjectId
    }
});

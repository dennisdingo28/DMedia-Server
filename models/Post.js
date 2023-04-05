const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:[true,'You must provide the image url']
    },
    imageAlt:{
        type:String,
        required:[true,'You must provide the image alt']
    },
    imageWidth:{
        type:Number,
        required:[true,'You must provide the image width']
    },
    imageHeight:{
        type:Number,
        required:[true,'You must provide the image height']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:[true,'You must provide the user id of the creator']
    }
});

const MongoosePostSchema = mongoose.model('posts',PostSchema);

module.exports = MongoosePostSchema;
const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
    },
    imageAlt:{
        type:String,
    },
    title:{
        type:String,
        required:[true,'Cannot submit an empty post']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:[true,'You must provide the user id of the creator']
    }
});

const MongoosePostSchema = mongoose.model('posts',PostSchema);

module.exports = MongoosePostSchema;
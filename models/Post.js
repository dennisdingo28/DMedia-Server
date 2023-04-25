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
    description:{
        type:String,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:[true,'You must provide the user id of the creator']
    },
    likes:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    dislikes:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    shares:{
        type:Number,
        default:0
    },
    share:{
        sharedBy:[{type:mongoose.Types.ObjectId}],
        initialUserId:mongoose.Types.ObjectId
    },
    comments:[{
        userId:mongoose.Types.ObjectId,
        commentText:{
            type:String,
            required:[true,'Cannot create an empty comment']
        },
    }],
    reports:{
        type:Number,
        default:0
    }
});

const MongoosePostSchema = mongoose.model('posts',PostSchema);

module.exports = MongoosePostSchema;
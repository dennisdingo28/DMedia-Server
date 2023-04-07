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
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    shares:{
        type:Number,
        default:0
    },
    reports:{
        type:Number,
        default:0
    }
});

const MongoosePostSchema = mongoose.model('posts',PostSchema);

module.exports = MongoosePostSchema;
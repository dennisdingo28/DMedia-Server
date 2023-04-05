const createPost = async(req,res,next) =>{
    try{
        res.status(201).json({msg:"Post created"});
    }catch(err){
        next(err);
    }
}

module.exports = {createPost};
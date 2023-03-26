const {CustomError} = require('../errors');

const errorHandler = (err,req,res,next)=>{

    function setError(message,status,good){
        defaultError.msg=message;
        defaultError.statusCode=status;
        defaultError.good=good;
    }


    const defaultError = {
        msg:"Something went wrong with the server",
        statusCode:500,
        good:false
    }

    if(err instanceof CustomError){
        setError(err.message,err.statusCode,false);
    }

    if(err.code==11000){
        
        if(err.keyValue.username){
            setError(`The username ${err.keyValue.username} is already taken.`,400,false);
        }else if(err.keyValue.email){
            setError(`The email ${err.keyValue.email} is already taken.`,400,false);
        }
    }

    res.status(500).json(defaultError); 
}

module.exports = errorHandler;
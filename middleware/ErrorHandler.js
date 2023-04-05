const { JsonWebTokenError } = require('jsonwebtoken');
const {CustomError} = require('../errors');

const errorHandler = (err,req,res,next)=>{

    console.log(err);

    function setError(message,status,good){
        defaultError.msg=message;
        defaultError.statusCode=status;
        defaultError.good=good;
    }

    const defaultError = {
        msg:"Something went wrong with the server",
        statusCode:500,//internal server error
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
    }else if(err.errors){
        if(err.errors.username){
            setError(`${err.errors.username}`,400,false);
        }else if(err.errors.email){
            setError(`${err.errors.email}`,400,false);
        }else if(err.errors.password){
            setError(`${err.errors.password}`,400,false);
        }else if(err.errors.imageUrl){
            setError(`${err.errors.imageUrl}`,400,false);
        }else if(err.errors.imageAlt){
            setError(`${err.errors.imageAlt}`,400,false);
        }else if(err.errors.imageWidth){
            setError(`${err.errors.imageWidth}`,400,false);
        }else if(err.errors.imageHeight){
            setError(`${err.errors.imageHeight}`,400,false);
        }else if(err.errors.createdBy){
            setError(`${err.errors.createdBy}`,400,false);
        }
    }

    if(err instanceof JsonWebTokenError)
        setError(`No authorization token was provided`,401,false);

    res.status(200).json(defaultError); 
}

module.exports = errorHandler;
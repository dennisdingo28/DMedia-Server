const jwt = require('jsonwebtoken');
const {Unauthorized} = require("../errors/index");

const authenticate = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith("Bearer"))
            throw new Unauthorized("No authentication token was provided");

        const token = authHeader.split(" ")[1];

        const decodedInfo = await jwt.verify(token,process.env.JWT_ENCRYPTION);

        req.user = decodedInfo;
        next();
    }catch(err){
        next(err);
    }
};

module.exports = authenticate;
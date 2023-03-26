const UserModel = require('../models/User');

const registerUser = async (req,res,next) =>{
    try{
        const user = await UserModel.create(req.body);
        console.log(user);
        res.status(201).json({msg:"Account was successfully created!"});
    }catch(err){
        next(err);
    }
}

const loginUser = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
            throw new Error("Bad Request");
        
        //check for the user
        const user = await UserModel.findOne({email});

        if(!user)
            throw new Error("Cannot find a user with the email: "+email);
        
        const isMatch = await UserModel.comparePassword(password,user.password);

        if(!isMatch)
            throw new Error("Password doesn't match !")
        
        const token = UserModel.generateJWT();
        res.status(201).json({good:true,msg:"Successfully logged in",token});

    }catch(err){
        next(err);
    }
}

module.exports = {registerUser,loginUser};
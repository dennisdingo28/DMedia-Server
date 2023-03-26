const UserModel = require('../models/User');

const registerUser = async (req,res,next) =>{
    try{
        const user = await UserModel.create(req.body);
        res.status(201).json({msg:"Account was successfully created!"});
    }catch(err){
        next(err);
    }
}
module.exports = {registerUser};
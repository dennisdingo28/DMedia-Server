const notFound = (req,res)=>{
    res.status(400).json({msg:"Route was not found"});
}

module.exports = notFound;
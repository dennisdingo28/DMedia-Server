const CustomError = require('./CustomError');

class Unauthorized extends CustomError {
    constructor(message){
        super(message);
        this.statusCode=401;
    }
}

module.exports=Unauthorized;
const CustomError = require('./CustomError');

class NotFound extends CustomError {
    constructor(message){
        super(message);
        this.statusCode=404;
    }
}

module.exports=NotFound;
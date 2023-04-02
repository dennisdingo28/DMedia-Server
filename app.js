require('dotenv').config();

//requires
const express = require('express');
const authRouter = require('./routes/auth');
const connectDB = require('./db/connect');
const notFound=require('./middleware/NotFound');
const errorHandler = require('./middleware/ErrorHandler');

//security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

//server
const app = express();

app.use(express.json());
//security
app.use(helmet());
app.use(xss());
app.use(cors());

//routes
app.get('/',(req,res)=>{
    res.status(200).send('<p>This is the server</p>')
});
//authentication route
app.use('/auth',authRouter);
//app.use('/search',searchRouter);


//middlewares
app.use(notFound);
app.use(errorHandler);

//enviroment port
const PORT = process.env.PORT || 5000;

const start = async (req,res) =>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{console.log(`Server is listening to port ${PORT}`);})
    }catch(err){
        console.log(err);
    }
}

start();


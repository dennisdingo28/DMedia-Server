require('dotenv').config();

const express = require('express');

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


//enviroment port
const PORT = process.env.PORT || 5000;

const start = async (req,res) =>{
    app.listen(PORT,()=>{console.log(`Server is listening to port ${PORT}`);})
}

start();


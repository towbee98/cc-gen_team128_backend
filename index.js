
const express= require('express');
const { json } = require('express')
const mongoose= require('mongoose');
const config= require('./config/env');
const app = express();
const indexRouter= require('./routes/index');
const authRouter = require('./routes/authRoute');

//Connect to the database
const ConnectDB = async (cb) => {
  try {
    await mongoose.connect(`${config.MONGO_URI}`);
    console.log("Database connected succesfully");
    cb();
  } catch (error) {
    console.log(error);
  }
};

app.use(json())
app.use('/api/v1/',indexRouter);
app.use('/api/register/', authRouter);
app.use('/*',(req,res)=>{
    res.status(404).json({
        status:'fail',
        message:'Route not found'
    })
})


ConnectDB(()=>{app.listen(config.PORT,()=> {
    console.log(`Server is now active at ${config.PORT}`)
})})
const mongoose= require('mongoose')


//CREATED NEW SCHEMA TO ADD "unique: true" to the "email" property
const newUserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Cannot be empty'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Password cannot be empty']
    }
});


const newUserModel = mongoose.model('newUser', newUserSchema)

module.exports= newUserModel
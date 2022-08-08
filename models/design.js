const mongoose=require('mongoose');

const designSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    compressedFile:{
        id:String,
        name:String
    },
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'comment'
    },
    likes:{
        type:Number
    }
})

const designModel= mongoose.model('design',designSchema)

module.exports=designModel
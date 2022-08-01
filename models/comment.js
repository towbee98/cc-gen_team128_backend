const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
    comment:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamp:true
})

const commentModel= mongoose.model('comment',commentSchema);

module.exports=commentModel
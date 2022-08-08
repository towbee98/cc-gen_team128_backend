const mongoose= require("mongoose");

const saveDesignSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    design:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'design'
    }
})

saveDesignSchema.index({user:1,design:1},{unique:true})
module.exports= mongoose.model('savedDesign',saveDesignSchema)
const Design= require('../models/design');
const User= require('../models/user')
const AppError= require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
const slug= require('slug')

const uploadDesign=catchAsync(async(req,res,next)=>{
   const newDesign = await Design.create({
    title:req.body.title,
    slug:slug(req.body.title),
    category:req.body.category,
    downloadLink:req.body.downloadLink,
    })
    if(!newDesign) return next(new AppError('Error occured while uploading the design',400));
    res.status(201).json({
        status:"success",
        message:'Design upload was successful',
        newDesign
    })
})

const fetchAllDesigns= catchAsync(async (req,res,next)=>{
    const filter= req.query;
    const designs= await Design.find(filter);
    res.status(200).json({
        status:"success",
        message:"Designs fetched successfully",
        designs
    })
})

const fetchDesign=catchAsync(async (req,res,next)=>{
    
    const design= await Design.findOne({_id:req.params.designId});
    if(!design) return next(new AppError('Design not found or does not exist',404))
    res.status(200).json({
        status:"success",
        message:"Design fetched successfully",
        design
    })
})

const saveDesign= catchAsync(async (req,res,next)=>{
    const design= Design.findOne({_id:req.params.designId});
    if(!design) return next(new AppError('Design not found or does not exist',404))
     await User.findByIdAndUpdate(req.user.id,{savedDesign:{$push:design._id}},{runValidators:true,new:true})
    res.status(200).json({
        status:"success",
        message:"Designs fetched successfully",
        design
    })
})

module.exports= {
    fetchAllDesigns,
    fetchDesign,
    saveDesign,
    uploadDesign
}
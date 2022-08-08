const fs= require('node:fs')
const Design= require('../models/design');
const savedDesign=require('../models/savedDesign')
const User= require('../models/user')
const AppError= require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
const slug= require('slug')
const {uploadFile,download}=require('../utils/upload')

const uploadDesign = catchAsync(async(req,res,next)=>{
   // console.log(req.files.designFile)
   const fileNames= Object.keys(req.files);
   const slugName=await slug(req.body.title)
   const design= await Design.findOne({slug:slugName})
   if(design) return next(new AppError('A design with this title already exist, Try changing the title',400))
// 
     const compressedFile = await uploadFile(req.files[fileNames[0]][0],slugName);
     const newDesign = await Design.create({
            title:req.body.title,
            slug:slugName,
            category:req.body.category,
            compressedFile:{id:compressedFile.id,name:compressedFile.name},
    }) 
    res.status(201).json({
        status:"success",
        message:'Design upload was successful',
        newDesign
    })
})

const fetchAllDesigns=catchAsync(async (req,res,next)=>{ 
    const filter={};
    if(req.query) filter=req.query  
    const design= await Design.find(filter);
    res.status(200).json({
        status:"success",
        message:"Design fetched successfully",
        design
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
    const design=await Design.findOne({_id:req.params.designId});
    if(!design) return next(new AppError('Design not found or does not exist',404))
     await savedDesign.create({user:req.user._id,design:design._id})
    res.status(200).json({
        status:"success",
        message:"Designs saved successfully",
        design
    })
})

const fetchSavedDesigns= catchAsync(async(req,res,next)=>{
    const filter={};
    if(req.user) filter.user=req.user._id;
    const savedDesigns= await savedDesign.find(filter)
    res.status(200).json({
        status:"success",
        message:"Saved designs fetched successfully",
        savedDesigns
    })
})

const downloadDesign= catchAsync(async(req,res,next)=>{
    const design= await Design.findOne({_id:req.params.designId});
    if(!design) return next(new AppError('Design not found or does not exist',404))
    downloadFile= {...design.compressedFile};
    const dest = fs.createWriteStream(`./${downloadFile.name}.zip`);
    await download(downloadFile,res,dest)
    fs.unlinkSync(`${downloadFile.name}.zip`)
} )
module.exports= {
    fetchAllDesigns,
    fetchDesign,
    saveDesign,
    fetchSavedDesigns,
    uploadDesign,
    downloadDesign
}

const router= require('express').Router()
const controller = require('../controllers/authController')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:"Generate your cc design for free here"
    })
})


module.exports= router
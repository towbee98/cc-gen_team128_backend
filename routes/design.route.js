const express= require('express');
const multer=require("multer");

const router= express.Router();
const upload=multer();
const designController= require('../controllers/design.controller')

router.route('/')
    .get(designController.fetchAllDesigns)
    .post(upload.fields([
    {name:"compressedFile",maxCount:1},
    ]),designController.uploadDesign)
router.route('/saved/:designId').post(designController.saveDesign)
router.route('/saved').get(designController.fetchSavedDesigns)
router.route('/:designId')
.get(designController.fetchDesign);
router.route('/:designId/download').get(designController.downloadDesign)

module.exports=router
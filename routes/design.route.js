const express= require('express');
const router= express.Router();

const designController= require('../controllers/design.controller')

router.route('/designs').get(designController.fetchAllDesigns).post(designController.uploadDesign)
router.route('/designs/:designId').get(designController.fetchDesign);

module.exports=router
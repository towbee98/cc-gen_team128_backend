const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer();
const designController = require('../controllers/design.controller');
const { Auth, IsAdmin } = require('../middlewares/auth');
router
    .route('/')
    .get(designController.fetchAllDesigns)
    .post(
        Auth,
        IsAdmin,
        upload.fields([{ name: 'compressedFile', maxCount: 1 }]),
        designController.uploadDesign
    );
router.use(Auth);
router.route('/saved/:designId').post(designController.saveDesign);
router.route('/saved').get(designController.fetchSavedDesigns);
router
    .route('/:designId')
    .get(designController.fetchDesign)
    .post(designController.addComment)
    .patch(designController.editComment);
router
    .route('/:designId/download')
    .get(designController.downloadDesign);
// router.route('/likes').post(designController.addLikes);

module.exports = router;

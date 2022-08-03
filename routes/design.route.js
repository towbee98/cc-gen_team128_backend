const express = require("express");
const router = express.Router();

const { Auth, IsAdmin } = require("../middlewares/auth");
const designController = require("../controllers/design.controller");

router
	.route("/")
	.get(designController.fetchAllDesigns)
	.post(Auth, IsAdmin, designController.uploadDesign);
router.route("/:designId").get(designController.fetchDesign);

module.exports = router;

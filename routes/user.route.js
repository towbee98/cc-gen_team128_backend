const express = require("express");
const router = express.Router();

router.route("/profile").get((req, res) => {
    res.send("welcome")
});

module.exports = router;
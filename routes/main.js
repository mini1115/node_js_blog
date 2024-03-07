const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";

router.get("/home", (req, res) => {
    res.render("hello index",{layout:mainLayout});
})
router.get("/about", (req, res) => {
    res.render("hello about",{layout:mainLayout});
})
module.exports = router;
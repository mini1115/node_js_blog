const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asyncHanlder = require("express-async-handler");

router.get(["/home", "/"], asyncHanlder(async (req, res) => {

    const locals = {
        title: "Home"
    };
    //게시글 모두 가져오기
    const data = await Post.find();
    res.render("index", { locals, data, layout: mainLayout });
})
);
router.get("/about", (req, res) => {
    const locals = {
        title: "About"
    };
    res.render("about", { locals, layout: mainLayout });
});
module.exports = router;

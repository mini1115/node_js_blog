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
// 게시글 상세보기
router.get("/post/:id", asyncHanlder(async (req, res) => {
    const data = await Post.findOne({ _id: req.params.id });
    res.render("post", { data, layout: mainLayout });
})
);

module.exports = router;

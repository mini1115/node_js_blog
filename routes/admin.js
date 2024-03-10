//관리자 페이지 관리 Routes
const express = require("express");
const router = express.Router();
const asyncHanlder = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const User = require("../models/User");
const Post = require("../models/Post");
const bcrpyt = require("bcrypt");
//웹토큰 비밀키
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.get("/admin", (req, res) => {
    const locals = {
        title: '관리자 페이지'
    };
    res.render("admin/index", { locals, layout: adminLayout2 });
});

//Check Login
router.post("/admin", asyncHanlder(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // if (username === "admin" && password === "admin") {
    //   res.send("Success");
    // } else {
    //   res.send("Fail");
    // }
    if (!user) {
        return res.status(401).json({ message: "일치하는 사용자가 없습니다" });
    }
    const isValidPassword = await bcrpyt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/allPosts");
})
);
//전체 게시물 표시하기
router.get("/allPosts",asyncHanlder(async(req,res)=>{
    const locals = {
        title : "POSTS"
    };
    const data = await Post.find();
    res.render("admin/allPosts",{locals,data,layout:adminLayout});
})
);
// //관리자 등록 get `방식 처리
// router.get("/register", asyncHanlder(async (req, res) => {
//     res.render("admin/index", { layout: adminLayout2 });
// })
// );
// // 관리자 등록 post 방식 처리

// router.post("/register", asyncHanlder(async (req, res) => {
//     //res.send("register success");
//     //비밀번호 암호화
//     const hashedPassword = await bcrpyt.hash(req.body.password, 10);
//     const user = await User.create({
//         username: req.body.username,
//         password: hashedPassword,
//     });
//     res.json(`${user} created !`)
// })
// );
module.exports = router;
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


//권한 확인 미들웨어
const checkLogin = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        res.redirect("/admin");
    }else{
        try{
            const decoded = jwt.verify(token,jwtSecret);
            req.userId = decoded.userId;
            next();
        }catch(error){
            res.redirect("/admin");
        }
    }

};

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
router.get("/allPosts",checkLogin,asyncHanlder(async(req,res)=>{
    const locals = {
        title : "POSTS"
    };
    const data = await Post.find();
    res.render("admin/allPosts",{locals,data,layout:adminLayout});
})
);
//로그아웃 처리
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
});

//새 게시글 작성
router.get("/add",checkLogin,asyncHanlder(async(req,res)=>{
    const locals =  {
        title : "게시글 작성"
    };
    res.render("admin/add",{locals,layout:adminLayout});
})
);
router.post("/add",checkLogin,asyncHanlder(async(req,res)=>{
    const {title,body} = req.body;
    const newPost = new Post({
        title : title,
        body : body
    });
    await Post.create(newPost);
    res.redirect("/allPosts");
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
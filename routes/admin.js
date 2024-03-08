//관리자 페이지 관리 Routes
const express = require("express");
const router = express.Router();
const asyncHanlder = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const User = require("../models/User");
const bcrpyt = require("bcrypt");

router.get("/admin", (req, res) => {
    const locals = {
        title: '관리자 페이지'
    };
    res.render("admin/index", { locals, layout: adminLayout2 });
});

//관리자 등록 get 방식 처리
router.get("/register",asyncHanlder(async(req,res)=>{
    res.render("admin/index", {layout: adminLayout2 });
})
);
//관리자 등록 post 방식 처리

router.post("/register",asyncHanlder(async(req,res)=>{
    //res.send("register success");
    //비밀번호 암호화
    const hashedPassword = await bcrpyt.hash(req.body.password,10);
    const user = await User.create({
        username : req.body.username,
        password : hashedPassword,
    });
    res.json(`${user} created !`)
})
);
module.exports = router;
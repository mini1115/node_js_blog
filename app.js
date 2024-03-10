require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");

const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
//정적 파일 사용하기(css)
app.use(express.static("public"));
//url parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//webtoken
app.use(cookieParser());

app.use("/",require("./routes/main"));
app.use("/",require("./routes/admin"));

app.listen(port,()=>{
    console.log(`app exec on port ${port}`);
})
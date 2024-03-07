require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("hello index");
})
app.listen(port,()=>{
    console.log(`app exec on port ${port}`);
})
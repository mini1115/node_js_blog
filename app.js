require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set("view engine","ejs");
app.set("views","./views");

app.une
app.use("/",require("./routes/main"));

app.listen(port,()=>{
    console.log(`app exec on port ${port}`);
})
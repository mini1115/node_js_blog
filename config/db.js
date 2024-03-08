const mongoose = require("mongoose");
const asyncHanlder = require("express-async-handler");
require("dotenv").config();

const connectDB = asyncHanlder(async ()=>{
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`db connect ${connect.connection.host}`);
})

module.exports = connectDB;
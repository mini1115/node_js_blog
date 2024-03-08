const mongoose = require("mongoose");

//관리자 등록

const UserSchema= new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique:true
    }, 
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User",UserSchema);
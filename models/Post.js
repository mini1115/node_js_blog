const mongoose = require("mongoose");

//게시글 => 제목, 내용 , 작성일 

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },body : {
        type : String,
        required : true
    },
    createdAt : {
        type: Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Post",PostSchema);
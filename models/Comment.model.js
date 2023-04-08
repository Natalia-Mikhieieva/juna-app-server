const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    message: {
        type: String, 
        required: true
    }, 
    author:{
        type: String, 
        // required: true
    },
    owner: Boolean,
    timestamp: Date
})

const Comment = model("Comment", commentSchema);

module.exports = Comment;
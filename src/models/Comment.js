import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: 'Text is required'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    childrenComment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReplyComment"
    }],
})

const model = mongoose.model("Comment",CommentSchema);
export default model;
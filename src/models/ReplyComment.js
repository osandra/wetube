import mongoose from "mongoose";

const ReplyCommentSchema = new mongoose.Schema({
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
})

const model = mongoose.model("ReplyComment",ReplyCommentSchema);
export default model;
import mongoose from "mongoose";
import collection from "../database/collection.database.js";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });

const PostModel = mongoose.model(collection.Post, postSchema);

export default PostModel;
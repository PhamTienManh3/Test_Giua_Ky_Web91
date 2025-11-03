import mongoose from "mongoose";
import collection from "../database/collection.database.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    apiKey: {
        type: String
    }
}, { timestamps: true });

const UserModel = mongoose.model(collection.User, userSchema);

export default UserModel;
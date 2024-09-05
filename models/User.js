import mongoose from "mongoose";
import { type } from "os";

// defining the schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }, 

    date: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true});

//Defining the Model
const User = mongoose.model("User", UserSchema);

export default User;
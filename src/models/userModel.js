const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"username required"]
    },
    email:{
        type:String,
        unique:[true,"email is already registered"],
        required:[true,"email required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    // pfp ka matlab profile picture hai. Agar user image nahi bhejta to default pfp save hogi.
    pfp:{
        type:String,
        default:"https://ik.imagekit.io/jsutK/pfp.jpg?updatedAt=1777371784218"
    }
})
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

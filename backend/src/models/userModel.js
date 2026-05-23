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
        required:[true,"password is required"],
        select:false
    },
    bio:String,
    //profile picture =pfp
    pfp:{
        type:String,
        default:"https://ik.imagekit.io/jsutK/pfp.jpg?updatedAt=1777371784218"
    },
    followers:[{
        type:String,
        ref:"users"
    }],
    following:[{
        type:String,
        ref:"users"
    }]
})
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

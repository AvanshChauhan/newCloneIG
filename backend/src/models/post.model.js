const mongoose=require("mongoose")

// Post schema me caption optional hai, image required hai aur user current post ka owner hai.
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"image required for post creation"]
    },
    user:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user required for post creation"]
    }
})
const postModel=mongoose.model("posts",postSchema)
module.exports=postModel

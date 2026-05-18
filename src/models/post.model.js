const mongoose=require("mongoose")
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
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user required for post creation"]
    }
})
const postModel=mongoose.model("posts",postSchema)
module.exports=postModel

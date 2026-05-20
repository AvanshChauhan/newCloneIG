const mongoose = require("mongoose")

// Like schema post aur user ko connect karta hai, matlab kis user ne kis post ko like kiya.
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required for liking a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user required for liking an image"]
    }
}, {
    timestamps: true
})
// Ek user ek post ko sirf ek baar like kar sake, isliye post + user pair unique hai.
likeSchema.index({post: 1,user: 1},{unique:true})
module.exports = mongoose.model("Like", likeSchema)

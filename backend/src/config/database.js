const mongoose=require("mongoose")

async function connectDB() {
    // Server start hote hi MongoDB connect hota hai, MONGO_URI .env file se aata hai.
    await mongoose.connect(process.env.MONGO_URI)
    console.log("db is connected")
}
module.exports=connectDB

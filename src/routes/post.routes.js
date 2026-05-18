const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const express = require("express");
const multer = require("multer");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// POST /api/post
// Ye API naya post create karti hai. Pehle cookie se JWT token leti hai aur check karti hai
// ki user logged-in hai ya nahi. Agar image file nahi mili to 400 response return hota hai.
// Image ko memory se ImageKit par upload kiya jata hai, token verify karke user id nikali jati hai,
// phir caption, image URL aur user id ke saath database me post save hota hai.
postRouter.post("/", upload.single("img"), async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // console.log(decoded)
    const result = await client.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "/posts",
    });
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "unauthorized access",
      });
    }
    const post = await postModel.create({
      caption: req.body.caption,
      imageUrl: result.url,
      user: decoded.id,
    });
    res.status(201).json({
      message: "post created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
});
// GET /api/post
// Ye API logged-in user ke posts fetch karti hai. Cookie se token check hota hai,
// token valid hone par decoded id se current user milta hai, aur database me us user ke
// saare posts find kiye jate hain. End me success response send hota hai.
postRouter.get("/",async (req,res)=>{
  const token=req.cookies.token;
  if(!token){
    res.status(401).json({message:"unauthorized acccess"})
  }
  let decoded
  try {
    decoded=jwt.verify(token,process.env.JWT_SECRET)
  } catch (error) {
    res.status(401).json({
      message:"token invalid"
    })
  }
  const UserId=decoded.id
  const post=await postModel.find({
    user:UserId,
  })
  res.status(201).json({
    message:"fetched post successfully"
  })
})
// GET /api/post/details/:postId
// Ye API kisi ek specific post ki details ke liye hai. Pehle user ka token verify hota hai,
// phir URL params se postId liya jata hai aur database me post find hoti hai.
// Agar post nahi milti to 404 return hota hai. Agar post kisi aur user ki hai to 403 return hota hai.
// Sirf owner user ko hi successful response milta hai.
postRouter.get("/details/:postId",async(req,res)=>{
  const token=req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:"unauthorized access"
    })
  }
  let decoded
  try {
    decoded=jwt.verify(token,process.env.JWT_SECRET)
  } catch (error) {
    res.status(401).json({
      message:"invalid token"
    })
  }
  const UserId=decoded.id
  const postId=req.params.postId
  const post=await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
      message:"post not found"
    })
  }
  const isValidUser=post.user.toString()===UserId
  if(!isValidUser){
    return res.status(403).json({
      message:"not valid user"
    })
  }
  return res.status(200).json({
    message:"post fetched successfully"
  })
})
module.exports = postRouter;

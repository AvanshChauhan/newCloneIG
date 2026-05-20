const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const express = require("express");
const multer = require("multer");
const postRouter = express.Router();
const postModel = require("../models/post.model");
const { checkUser } = require("../middlewares/auth.middleware");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const likeModel=require("../models/like.model")

// ImageKit client image upload ke liye use hota hai. Actual keys .env se aati hain.
const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// POST /api/posts
// Ye API naya post create karti hai. checkUser middleware pehle user verify karta hai.
// Agar image file nahi mili to 400 response return hota hai. Image ko memory se ImageKit par
// upload karke caption, image URL aur user id ke saath database me post save hota hai.
postRouter.post("/", checkUser, upload.single("img"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // console.log(decoded)
    const result = await client.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "/posts",
    });
    const post = await postModel.create({
      caption: req.body.caption,
      imageUrl: result.url,
      user: req.user.id,
    });
    res.status(201).json({
      message: "post created successfully",
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
});
// GET /api/posts
// Ye API logged-in user ke posts fetch karti hai. checkUser se current user milta hai,
// aur database me us user ke saare posts find kiye jate hain.
postRouter.get("/",checkUser,async (req,res)=>{
  const UserId=req.user.id
  const post=await postModel.find({
    user:UserId,
  })
  res.status(200).json({
    message:"fetched post successfully",
    post
  })
})
// GET /api/posts/details/:postId
// Ye API kisi ek specific post ki details ke liye hai. checkUser pehle user verify karta hai,
// phir URL params se postId liya jata hai aur database me post find hoti hai.
// Agar post nahi milti to 404 return hota hai. Agar post kisi aur user ki hai to 403 return hota hai.
// Sirf owner user ko hi successful response milta hai.
postRouter.get("/details/:postId",checkUser,async(req,res)=>{
  const UserId=req.user.id
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
    message:"post fetched successfully",
    post
  })
})
//@description : like an post,
// @route POST /api/posts/like/:postid
// Ye API logged-in user se post like karwati hai. Token se user id aati hai,
// params se post id aati hai, phir duplicate like ko check karke like save hota hai.
postRouter.post("/like/:postid", checkUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postid;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post does not exist"
      });
    }

    const alreadyLiked = await likeModel.findOne({
      post: postId,
      user: userId
    });

    if (alreadyLiked) {
      return res.status(409).json({
        message: "post already liked"
      });
    }

    const like = await likeModel.create({
      post: postId,
      user: userId
    });

    return res.status(201).json({
      message: "post liked successfully",
      like
    });
  } catch (err) {
    next(err);
  }
});
module.exports = postRouter;

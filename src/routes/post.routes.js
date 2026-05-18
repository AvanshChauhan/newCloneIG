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

module.exports = postRouter;

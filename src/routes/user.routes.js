const express = require("express");
const userRouter = express.Router();
const { checkUser } = require("../middlewares/auth.middleware");
const followModel = require("../models/follow.model");
const userModel = require("../models/userModel");

// @description : follows a user by username
// @route POST /api/users/follows/:username
// @access Private
userRouter.post("/follows/:username", checkUser, async (req, res, next) => {
  try {
    // Yaha logged-in user follower hai, aur params wala username follow hone wala user hai.
    const followerId = req.user.id;
    const followingUsername = req.params.username;

    const followingUser = await userModel.findOne({ username: followingUsername });

    if (!followingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    if (followingUser._id.toString() === followerId) {
      return res.status(400).json({ message: "you cannot follow yourself" });
    }

    // Same follow relation dobara create na ho, isliye pehle existing record check kar rahe hain.
    const alreadyFollowing = await followModel.findOne({
      follower: followerId,
      following: followingUser._id,
    });

    if (alreadyFollowing) {
      return res.status(409).json({ message: "already following this user" });
    }

    await followModel.create({
      follower: followerId,
      following: followingUser._id,
    });

    res.status(201).json({
      message: `followed ${followingUser.username}`,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;

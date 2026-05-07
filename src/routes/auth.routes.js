const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Auth routes are ready",
    routes: {
      register: "POST /api/auth/register",
    },
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, bio, pfp } = req.body;

    const user = await userModel.create({
      username,
      email,
      password,
      bio,
      pfp,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        pfp: user.pfp,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      error.statusCode = 409;
      error.message = "Username or email already exists";
    }

    next(error);
  }
});

module.exports = router;

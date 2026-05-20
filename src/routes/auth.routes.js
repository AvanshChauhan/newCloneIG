const express = require("express");
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST /api/auth/register
// Ye API new user create karti hai. Pehle required fields validate hote hain,
// fir duplicate email/username check hota hai, password hash hota hai aur token cookie me set hota hai.
authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, username, password, bio, pfp } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "username, email and password are required",
      });
    }

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message:
          isUserExist.email === email
            ? "email already exists"
            : "username already taken",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPass,
      bio,
      pfp,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        pfp: user.pfp,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
// Ye API username ya email se user find karti hai, password compare karti hai,
// aur login successful hone par JWT token cookie me save kar deti hai.
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "username or email and password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({
        message: "password is not valid",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4d" }
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user logged in",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = authRouter;

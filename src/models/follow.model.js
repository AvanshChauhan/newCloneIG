const mongoose = require("mongoose");

// Follow schema follower aur following user ke beech relation store karta hai.
const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek follower ek hi user ko baar-baar follow na kar sake, ye unique pair enforce karta hai.
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;

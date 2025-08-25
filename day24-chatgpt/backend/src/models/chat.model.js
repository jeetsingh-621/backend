const mongoose = require("mongoose");

const chatschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lastactivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const chatmodel = mongoose.model("chat", chatschema);
module.exports = chatmodel;

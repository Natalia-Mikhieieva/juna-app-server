const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: number,
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: Boolean,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const item = model("Item", itemSchema);

module.exports = Item;

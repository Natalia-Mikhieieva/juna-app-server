const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Boolean,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: {
    type: String,
  },
  owner: Boolean,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  // collection: { type: Schema.Types.ObjectId, ref: "Collection" },
});

const Item = model("Item", itemSchema);

module.exports = Item;

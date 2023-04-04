const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
  },

  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  catalogId: { type: Schema.Types.ObjectId, ref: "Catalog" },
});

module.exports = model("Item", itemSchema);

const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const catalogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: {
    type: String,
  },
});

const Catalog = model("Catalog", catalogSchema);

module.exports = Catalog;

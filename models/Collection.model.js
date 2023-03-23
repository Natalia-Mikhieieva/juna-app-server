const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const collectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: {
    type: String,
  },
});

const Collection = model("Collection", collectionSchema);

module.exports = Collection;

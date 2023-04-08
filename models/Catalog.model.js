const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const catalogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  // owner will be added later on
});

module.exports = model("Catalog", catalogSchema);

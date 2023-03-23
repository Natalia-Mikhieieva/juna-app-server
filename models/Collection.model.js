const { Schema, model } = require("mongoose");

const collectionSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      creator: {
        type: String,
        required: true,
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      imageUrl: {
        type: String
        // required: true,
      },
      comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], 
})

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
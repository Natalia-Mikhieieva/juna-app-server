const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLenght: [8, "Please use a valid email address"]

    },
    name: {
      type: String,
      required: [true, "Name is required."]
    },
    post:[{type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

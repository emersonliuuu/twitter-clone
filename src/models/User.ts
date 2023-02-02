import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, require: true },
    profilePicture: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      max: 280,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

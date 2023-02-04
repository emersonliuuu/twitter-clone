import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      max: 280,
      require: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", TweetSchema);

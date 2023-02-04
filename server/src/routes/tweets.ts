import express from "express";
import {
  createTweet,
  likeOrDisLike,
  deleteTweet,
  getAllTimelineTweets,
  getAllUserTweets,
  getExploreTweets,
} from "../controllers/tweets";
import { verifyToken } from "../verifyToken";

const router = express.Router();

router.post("/", verifyToken, createTweet);

router.put("/:id/like", verifyToken, likeOrDisLike);

router.delete("/:id", verifyToken, deleteTweet);

router.get("/timeline/:id", getAllTimelineTweets);
router.get("/user/all/:id", getAllUserTweets);
router.get("/explore", getExploreTweets);

export default router;

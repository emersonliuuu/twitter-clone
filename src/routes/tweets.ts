import express from "express";
import { createTweet, likeOrDisLike, deleteTweet } from "../controllers/tweets";
import { verifyToken } from "../verifyToken";

const router = express.Router();

router.post("/", verifyToken, createTweet);

router.put("/:id/like", verifyToken, likeOrDisLike);

router.delete("/:id", verifyToken, deleteTweet);

export default router;

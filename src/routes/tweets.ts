import express from "express";
import { createTweet, deleteTweet } from "../controllers/tweets";
import { verifyToken } from "../verifyToken";

const router = express.Router();

router.post("/", verifyToken, createTweet);

router.delete("/:id", verifyToken, deleteTweet);

export default router;

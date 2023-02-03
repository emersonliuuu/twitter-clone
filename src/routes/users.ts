import express from "express";
import { getUser, update, follow, unfollow } from "../controllers/users";
import { verifyToken } from "../verifyToken";

const router = express.Router();

router.get("/find/:id", getUser);

router.put("/:id", verifyToken, update);
router.put("/:id/follow", verifyToken, follow);
router.put("/:id/unfollow", verifyToken, unfollow);

export default router;

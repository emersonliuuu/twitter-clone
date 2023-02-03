import express from "express";
import {
  getUser,
  update,
  follow,
  unfollow,
  deleteUser,
} from "../controllers/users";
import { verifyToken } from "../verifyToken";

const router = express.Router();

router.get("/find/:id", getUser);

router.put("/:id", verifyToken, update);
router.put("/follow/:id", verifyToken, follow);
router.put("/unfollow/:id", verifyToken, unfollow);

router.delete("/:id", verifyToken, deleteUser);

export default router;

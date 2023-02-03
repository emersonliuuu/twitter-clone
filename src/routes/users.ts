import express from "express";
import { getUser, update } from "../controllers/users";
import { verifyToken } from "../verifyToken";

const router = express.Router();

router.get("/find/:id", getUser);

router.put("/:id", verifyToken, update);

export default router;

import express from "express";
import { signup } from "../controllers/users";

const router = express.Router();

router.post("/signup", signup);

export default router;

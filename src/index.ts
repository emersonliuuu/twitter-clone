import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auths";
import userRoutes from "./routes/users";

const app = express();
dotenv.config();

const connect = () => {
  const MONGO_KEY = process.env.MONGO ?? "";

  mongoose.set("strictQuery", true);
  mongoose
    .connect(MONGO_KEY)
    .then(() => console.log("connect to mongodb"))
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening on 8000.");
});

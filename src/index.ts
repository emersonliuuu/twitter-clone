import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(8000, () => {
  connect();
  console.log("Listening on 8000.");
});

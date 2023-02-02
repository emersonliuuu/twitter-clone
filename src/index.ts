import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auths";

const app = express();
app.use(bodyParser.json());
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

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening on 8000.");
});

import { Request, Response, NextFunction } from "express";
import Tweet from "../models/Tweet";

export const createTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTweet = new Tweet({ ...req.body, userId: req.body.id });

    await newTweet.save();

    // @ts-ignore
    res.status(200).json(newTweet._doc);
  } catch (err) {
    next(err);
  }
};

export const deleteTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      res.status(404);
      return next(new Error("tweet not found"));
    }
    if (tweet?.userId === req.body.id) {
      await tweet?.deleteOne();
      // @ts-ignore
      res.status(200).json("tweet deleted");
    } else {
      res.status(403);
      return next(new Error("you can only delete your own tweets"));
    }
  } catch (err) {
    next(err);
  }
};

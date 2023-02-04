import { Request, Response, NextFunction } from "express";
import Tweet from "../models/Tweet";
import User from "../models/User";

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

export const likeOrDisLike = async (
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
    if (tweet?.likes.includes(req.body.id)) {
      await tweet.updateOne({
        $pull: { likes: req.body.id },
        $inc: { likesCount: -1 },
      });

      res.status(200).json("disliked tweet");
    } else {
      await tweet.updateOne({
        $push: { likes: req.body.id },
        $inc: { likesCount: 1 },
      });

      res.status(200).json("liked tweet");
    }
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

      res.status(200).json("tweet deleted");
    } else {
      res.status(403);
      return next(new Error("you can only delete your own tweets"));
    }
  } catch (err) {
    next(err);
  }
};

export const getAllTimelineTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: req.params.id });
    const followingTweets = await Promise.all(
      // @ts-ignore // TODO
      user?.following.map((followingId) => Tweet.find({ userId: followingId }))
    );
    // @ts-ignore // TODO
    res.status(200).json(userTweets.concat(...followingTweets));
  } catch (err) {
    next(err);
  }
};

export const getAllUserTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (err) {
    next(err);
  }
};

export const getExploreTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweets = await Tweet.find({ likes: { $exists: true } }).sort({
      likesCount: -1,
    });

    res.status(200).json(tweets);
  } catch (err) {
    next(err);
  }
};

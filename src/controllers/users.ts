import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      next(new Error("user not found"));
    }

    // @ts-ignore
    const { password, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (err) {
    res.status(404);
    next(new Error("user not found"));
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id === req.body.id) {
      let updateData = req.body;
      if (req.body.password) {
        const pwd = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hashedPwd = bcrypt.hashSync(pwd, salt);
        updateData.password = hashedPwd;
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: updateData,
        },
        { new: true } // "true", will return object after updated
      );
      if (!user) {
        res.status(404);
        next(new Error("user not found"));
      }
      // @ts-ignore
      const { password, ...userData } = user._doc;

      res.status(200).json(userData);
    } else {
      res.status(403);
      return next(new Error("can only update your own account"));
    }
  } catch (err) {
    next(err);
  }
};

export const follow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id === req.body.id) {
      res.status(403);
      return next(new Error("you cant follow yourself"));
    }
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (!user?.followers.includes(currentUser?._id)) {
      await user?.updateOne({
        $push: { followers: currentUser?._id },
      });
      await currentUser?.updateOne({
        $push: { following: user?._id },
      });
    } else {
      res.status(403).json("you already followed the user");
    }

    res.status(200).json("following the user");
  } catch (err) {
    next(err);
  }
};

export const unfollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id === req.body.id) {
      res.status(403);
      return next(new Error("you cant unfollow yourself"));
    }
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (user?.followers.includes(currentUser?._id)) {
      await user?.updateOne({
        $pull: { followers: currentUser?._id },
      });
      await currentUser?.updateOne({
        $pull: { following: user?._id },
      });
    } else {
      res.status(403).json("you already unfollowed the user");
    }

    res.status(200).json("unfollowed the user");
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id === req.body.id) {
      await User.findByIdAndDelete(req.body.id);
      // TODO: delete user id in follower's following field and following's follower field.

      res.status(200).json("user deleted");
    } else {
      res.status(403);
      return next(new Error("you can only delete your own account"));
    }
  } catch (err) {
    next(err);
  }
};

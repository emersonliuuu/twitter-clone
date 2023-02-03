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
      return next(new Error("can only update your own account."));
    }
  } catch (err) {
    next(err);
  }
};

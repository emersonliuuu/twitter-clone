import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const DEFAULT = "h5oNhVmLhM2UreaZLsLLF3H";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pwd = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(pwd, salt);
    const newUser = new User({ ...req.body, password: hashedPwd });

    await newUser.save();
    // @ts-ignore
    const { password, ...savedUserData } = newUser._doc; // TODO

    const _ = process.env.JWT ?? DEFAULT;
    const token = jwt.sign({ id: newUser._id, pwd: password }, _);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send(savedUserData);
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401);
      return next(new Error("username or password incorrect"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user?.password!);
    if (!isCorrect) {
      res.status(401);
      return next(new Error("username or password incorrect"));
    }

    // @ts-ignore
    const { password, ...userData } = user._doc;
    const _ = process.env.JWT ?? DEFAULT;
    const token = jwt.sign({ id: user._id, pwd: password }, _);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (err) {
    next(err);
  }
};

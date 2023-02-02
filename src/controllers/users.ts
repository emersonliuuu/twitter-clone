import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

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

    const _ = process.env.JWT ?? "h5oNhVmLhM2UreaZLsLLF3H";
    const token = jwt.sign({ id: newUser._id, pwd: password }, _);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send(savedUserData);
  } catch (err) {
    next(err);
  }
};

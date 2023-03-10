import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  id: string;
}

const DEFAULT = "h5oNhVmLhM2UreaZLsLLF3H";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401);
    return next(new Error("you are not authenticated"));
  }

  const _ = process.env.JWT ?? DEFAULT;
  // @ts-ignore // TODO
  jwt.verify(token, _, (err, decoded) => {
    if (err) {
      res.status(403);
      return next(new Error(err.message));
    }

    if (!decoded) {
      res.status(400);
      return next(new Error("Invalid JWT token"));
    }

    const { id } = decoded as ITokenPayload;

    // TODO: Check the correct usage for assigning id:
    // in tutorial: req.user = {id};
    req.body.id = id;

    return next();
  });
};

import { Response, Request, NextFunction } from "express";
import Token from "../classes/token";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

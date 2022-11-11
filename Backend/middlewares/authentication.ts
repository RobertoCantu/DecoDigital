import { Response, Request, NextFunction } from "express";
import Token from "../classes/token";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    Token.checkToken(req.token).then((decoded: any) => {
      req.user = decoded.user;
      next();
    }).catch(err => {
      res.json({
        ok: false,
        message: "Token invalido",
      });
    });

  } else {
    res.sendStatus(403);
  }
};


// const userToken = req.get("x-token") || "";

// Token.checkToken(userToken)
//   .then((decoded: any) => {
//     req.user = decoded.user;
//     next();
//   })
//   .catch((err) => {
//     res.json({
//       ok: false,
//       message: "Invalid token",
//     });
//   });
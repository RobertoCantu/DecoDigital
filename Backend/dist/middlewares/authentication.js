"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        token_1.default.checkToken(req.token).then((decoded) => {
            req.user = decoded.user;
            next();
        }).catch(err => {
            res.json({
                ok: false,
                message: "Token invalido",
            });
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.verifyToken = verifyToken;
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

//Plantilla
import { Router, Request, Response } from "express";
import Token from "../classes/token";
import { verifyToken } from "../middlewares/authentication";
require("dotenv").config();

const rutaRoutes = Router();

//Ruta protegida por el jwt
// rutaRoutes.get("/", verifyToken, (req: any, res: Response) => {
rutaRoutes.get("/", (req: any, res: Response) => {
  const user = req.user;
  res.json({
    ok: true,
    message: "GET",
  });
});

rutaRoutes.post("/", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "POST",
  });
});

rutaRoutes.put("/", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "PUT",
  });
});

rutaRoutes.delete("/", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "DELETE",
  });
});

export default rutaRoutes;

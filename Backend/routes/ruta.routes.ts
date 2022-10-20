//Plantilla
import { Router, Request, Response } from "express";
import Token from "../classes/token";
import { verifyToken } from "../middlewares/authentication";
require("dotenv").config();
import axios from "axios";

const rutaRoutes = Router();

//Ruta protegida por el jwt
// rutaRoutes.get("/", verifyToken, (req: any, res: Response) => {
rutaRoutes.get("/", (req: any, res: Response) => {
  const user = req.user;
  getUser();

  res.json({
    ok: true,
    message: "GET2",
  });
});
async function getUser() {
  try {
    const response = await axios.get(
      "https://bigquery.googleapis.com/bigquery/v2/projects/driven-rig-363116/datasets/bd_prueba/tables/colonia/data",
      {
        headers: {
          Authorization:
            "Bearer " +
            "ya29.a0Aa4xrXOa66IzJupJYzU5ROthgNqGxwZHFOqHmrUSzObwJl2Dd1V4JSmCQuIDOTZ12BRE2wzbX_HWPG3smVFVdE90pxMCysEcpgqEecFC6UxuiG37e_xtC1ER5olSXrGyn0I4bxW5Ox9lHjyBTSMToD2oo6Reg4bcTA8Rdoyt1nM3e0xgau1yBEvFLMn5RFHwB3g1VxwdgfRYMk1BjHU6pDxG2X_Zvl5DvujF-OMs-acOMZ2KQQeupPUqEjn3XrvLIKGJRdUaCgYKATASARISFQEjDvL9pLaTYukouVRY6K1Vg5Z0Vg0270",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

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

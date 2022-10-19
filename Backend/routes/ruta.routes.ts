//Plantilla
import { Router, Request, Response } from "express";
import Token from "../classes/token";
import { verifyToken } from "../middlewares/authentication";
// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
require("dotenv").config();

const {google} = require('googleapis');

//Testing
const Students = google.Students;

const rutaRoutes = Router();

//Ruta protegida por el jwt
// rutaRoutes.get("/", verifyToken, (req: any, res: Response) => {
rutaRoutes.get("/", (req: any, res: Response) => {
  const user = req.user;
  async function createDataset() {
    // Creates a client
    const bigqueryClient = new BigQuery();

    // Create the dataset
    const [dataset] = await bigqueryClient.createDataset('TecTable');
    console.log(`Dataset ${dataset.id} created.`);
  }
  createDataset();
  
  res.json({
    ok: true,
    message: "lol",
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

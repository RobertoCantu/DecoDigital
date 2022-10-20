//Plantilla
import { Router, Request, Response } from "express";
import Token from "../classes/token";
import { verifyToken } from "../middlewares/authentication";
// Imports the Google Cloud client library
const { BigQuery } = require("@google-cloud/bigquery");
require("dotenv").config();
const firebase = require("../firebase");
const { google } = require("googleapis");

//Testing
const Students = google.Students;

const userRoutes = Router();

//Ruta protegida por el jwt
// userRoutes.get("/", verifyToken, (req: any, res: Response) => {
userRoutes.get("/", (req: any, res: Response) => {
  console.log(firebase.default);



  res.json({
    ok: true,
    message: "lol",
  });
});

userRoutes.post("/register", async (req: Request, res: Response) => {
  const { nuc, phone, contract, city, password } = req.body;

  const bigQueryClient = new BigQuery();

  //get nuc and phone from bd_prueba dataset and cliente_unico table
  const userQuery = `SELECT identificador, nuc, telef1 FROM \`bd_prueba.cliente_unico\` WHERE nuc = "${nuc}" AND telef1 = "${phone}"`;
  const optionsUser = {
    query: userQuery,
    location: "US-Central1",
  };

  // Run the query as a job
  const [jobUser] = await bigQueryClient.createQueryJob(optionsUser);
  // Wait for the query to finish
  const [rowsUser] = await jobUser.getQueryResults();
  const { identificador, telef1 } = rowsUser[0];
  const nucUser = rowsUser[0].nuc;

  if (nucUser === nuc && telef1 === phone) {
    //insert into table clientes on dataset TecTable
    const query = `INSERT INTO TecTable.clientes (nuc, phone, password) VALUES ('${nuc}', '${phone}', '${password}')`;
    const options = {
      query: query,
      location: "US",
    };
    // Run the query as a job
    const [job] = await bigQueryClient.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    res.json({
      ok: true,
      message: "Usuario creado",
    });
  } else {
    return res.json({
      ok: false,
      message: "Usuario no encontrado",
    });
  }
});

userRoutes.put("/", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "PUT",
  });
});

userRoutes.delete("/", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "DELETE",
  });
});

export default userRoutes;

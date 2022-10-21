//Plantilla
import { Router, Request, Response } from "express";
import Token from "../classes/token";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
  const userQuery = `SELECT nuc, telef1 FROM \`bd_prueba.cliente_unico\` WHERE nuc = "${nuc}" AND telef1 = "${phone}"`;
  const optionsUser = {
    query: userQuery,
    location: "US-Central1",
  };
  // Run the query as a job
  const [jobUser] = await bigQueryClient.createQueryJob(optionsUser);
  // Wait for the query to finish
  const [rowsUser] = await jobUser.getQueryResults();
  if (rowsUser.length === 0) {
    return res.json({
      ok: false,
      message: "Usuario no encontrado",
    });
  }
  const { identificador, telef1 } = rowsUser[0];
  const nucUser = rowsUser[0].nuc;

  const user = {
    nuc: nucUser,
    phone: telef1,
  };

  if (nucUser === nuc && telef1 === phone) {
    const userToken = Token.getJwtToken(user);

    return res.json({
      ok: true,
      token: userToken,
    });

    //insert into table clientes on dataset TecTable
    const query = `INSERT INTObd_prueba.login_usuario (nuc, phone, password) VALUES ('${nuc}', '${phone}', '${password}')`;
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

userRoutes.post(
  "/register/password",
  verifyToken,
  async (req: Request, res: Response) => {
    const bigQueryClient = new BigQuery();
    const { nuc, phone } = req.user;

    const userQuery = `SELECT nuc, telef1 FROM \`bd_prueba.cliente_unico\` WHERE nuc = "${nuc}" AND telef1 = "${phone}"`;
    const optionsUser = {
      query: userQuery,
      location: "US-Central1",
    };
    // Run the query as a job
    const [jobUser] = await bigQueryClient.createQueryJob(optionsUser);
    // Wait for the query to finish
    const [rowsUser] = await jobUser.getQueryResults();

    if (rowsUser.length === 0) {
      return res.json({
        ok: false,
        message: "Error al registrar contraseña",
      });
    }
    
    const { identificador, telef1 } = rowsUser[0];
    const nucUser = rowsUser[0].nuc;
    const password = bcrypt.hashSync(req.body.password, 10);


    const user = {
      nuc: nucUser,
      phone: telef1,
      password: password,
    };

    if (nucUser === nuc && telef1 === phone) {

      // find nuc and phone in table clientes on dataset TecTable
      const queryFind = `SELECT nuc, phone FROM bd_prueba.login_usuario WHERE nuc = "${nuc}" AND phone = "${phone}"`;
      const optionsFind = {
        query: queryFind,
        location: "US-Central1",
      };
      // Run the query as a job
      const [jobFind] = await bigQueryClient.createQueryJob(optionsFind);
      // Wait for the query to finish
      const [rowsFind] = await jobFind.getQueryResults();

      if (rowsFind.length !== 0) {
        return res.json({
          ok: false,
          message: "Usuario ya registrado",
        });
      }

      //insert into table clientes on dataset TecTable if not exist nuc and phone
      const query = `INSERT INTO bd_prueba.login_usuario (nuc, phone, password) VALUES ('${user.nuc}', '${user.phone}', '${user.password}')`;
      const options = {
        query: query,
        location: "US-Central1",
      };
      // Run the query as a job
      const [job] = await bigQueryClient.createQueryJob(options).catch((err) => {
        return res.json({
          ok: false,
          message: "Error al registrar contraseña",
        });
      });
      // Wait for the query to finish
      const [rows] = await job.getQueryResults();
      console.log("Creado", rows);

      return res.json({
        ok: true,
        message: "Usuario registradp con exito",
      });
    }
  }
);

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

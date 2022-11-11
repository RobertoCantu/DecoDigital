"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Plantilla
const express_1 = require("express");
const token_1 = __importDefault(require("../classes/token"));
const authentication_1 = require("../middlewares/authentication");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Imports the Google Cloud client library
const { BigQuery } = require("@google-cloud/bigquery");
require("dotenv").config();
const { google } = require("googleapis");
//Testing
const Students = google.Students;
const rutaRoutes = (0, express_1.Router)();
//Ruta protegida por el jwt
// rutaRoutes.get("/", verifyToken, (req: any, res: Response) => {
rutaRoutes.get("/", (req, res) => {
    const user = req.user;
    function createDataset() {
        return __awaiter(this, void 0, void 0, function* () {
            // Creates a client
            const bigqueryClient = new BigQuery();
            // Create the dataset
            const [dataset] = yield bigqueryClient.createDataset("TecTable");
        });
    }
    createDataset();
    res.json({
        ok: true,
        message: "lol",
    });
});
rutaRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    const bigQueryClient = new BigQuery();
    const passwordCrpt = bcrypt_1.default.hashSync(password, 10);
    const queryLogin = `SELECT * FROM bd_prueba.login_usuario WHERE phone = "${phone}"`;
    const options = {
        query: queryLogin,
        location: "US-Central1",
    };
    // Runs the query
    const [jobLogin] = yield bigQueryClient.createQueryJob(options);
    const [rowsLogin] = yield jobLogin.getQueryResults();
    if (rowsLogin.length === 0) {
        return res.status(400).json({
            ok: false,
            message: "Usuario no encontrado",
        });
    }
    const passwordNew = rowsLogin[0].password;
    // compare passwords
    bcrypt_1.default.compare(password, passwordNew).then((result) => {
        if (!result) {
            return res.status(400).json({
                ok: false,
                message: "Contraseña incorrecta",
            });
        }
    });
    let intPhone = parseInt(phone);
    //get nomter, apepaterno, apematerno, correo, identificador from cliente_unico table where nuc = nuc
    const userQuery = `SELECT C.nomter, C.apepaterno, C.apematerno, C.correo_1, C.identificador FROM \`driven-rig-363116.bd_prueba.cliente_unico\` C  WHERE nuc = "${rowsLogin[0].nuc}"`;
    // const userQuery = `SELECT C.nomter, C.apepaterno, C.apematerno, C.correo_1, L.phone, C.identificador
    //   FROM \`driven-rig-363116.bd_prueba.login_usuario\` L
    //   INNER JOIN \`driven-rig-363116.bd_prueba.cliente_unico\` C on L.nuc = C.nuc
    //   WHERE L.password = "${passwordCrpt}" AND L.phone = "${phone}"`;
    const optionsUser = {
        query: userQuery,
        location: "US-Central1",
    };
    // Run the query as a job
    const [jobUser] = yield bigQueryClient.createQueryJob(optionsUser);
    // Wait for the query to finish
    const [rowsUser] = yield jobUser.getQueryResults();
    console.log(rowsUser);
    // const { nombre, apellido_p, apellido_m, correo, telefono, id } = rowsUser[0];
    const user = rowsUser[0];
    if (user) {
        const userToken = token_1.default.getJwtToken(user);
        const response = { user: user, token: userToken };
        return res.json({
            ok: true,
            message: response,
        });
    }
    else {
        return res.status(400).json({
            ok: false,
            message: "Usuario no encontrado",
        });
    }
}));
rutaRoutes.post("/", (req, res) => {
    res.json({
        ok: true,
        message: "POST",
    });
});
rutaRoutes.put("/", (req, res) => {
    res.json({
        ok: true,
        message: "PUT",
    });
});
rutaRoutes.delete("/", (req, res) => {
    res.json({
        ok: true,
        message: "DELETE",
    });
});
rutaRoutes.get("/client_info", authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bigQueryClient = new BigQuery();
    const query = `SELECT DISTINCT cliente_unico.nuc, cliente_unico.nomter, cliente_unico.apepaterno, cliente_unico.apematerno, cliente_unico.direc, colonia.desccolonia, ciudad.codciudad, pais.descpais, cliente_unico.entre_calles, municipio.descmunicipio, estado.descestado, cliente_unico.telef1,
  cliente_unico.correo_1
  FROM bd_prueba.cliente_unico
  INNER JOIN
  bd_prueba.colonia ON colonia.codcolonia = cliente_unico.codcolonia
  INNER JOIN 
  bd_prueba.ciudad ON ciudad.codciudad = cliente_unico.codciudad
  INNER JOIN 
  bd_prueba.pais ON pais.codpais = cliente_unico.codpais
  INNER JOIN
  bd_prueba.municipio ON municipio.codmunicipio = cliente_unico.codmunicipio
  INNER JOIN
  bd_prueba.estado ON estado.codestado = cliente_unico.codestado
  WHERE cliente_unico.nuc = "223525417"
  LIMIT 1`;
    const optionsUser = {
        query: query,
        location: "US-Central1",
    };
    // Run the query as a job
    const [job] = yield bigQueryClient.createQueryJob(optionsUser);
    // Wait for the query to finish
    const [rows] = yield job.getQueryResults();
    // const { nombre, apellido_p, apellido_m, correo, telefono, id } = rowsUser[0];
    const data = rows[0];
    return res.json({
        data: data,
    });
}));
exports.default = rutaRoutes;

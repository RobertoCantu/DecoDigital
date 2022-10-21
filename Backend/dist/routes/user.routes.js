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
const bcrypt_1 = __importDefault(require("bcrypt"));
const authentication_1 = require("../middlewares/authentication");
// Imports the Google Cloud client library
const { BigQuery } = require("@google-cloud/bigquery");
require("dotenv").config();
const firebase = require("../firebase");
const { google } = require("googleapis");
//Testing
const Students = google.Students;
const userRoutes = (0, express_1.Router)();
//Ruta protegida por el jwt
// userRoutes.get("/", verifyToken, (req: any, res: Response) => {
userRoutes.get("/", (req, res) => {
    console.log(firebase.default);
    res.json({
        ok: true,
        message: "lol",
    });
});
userRoutes.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nuc, phone, contract, city, password } = req.body;
    const bigQueryClient = new BigQuery();
    //get nuc and phone from bd_prueba dataset and cliente_unico table
    const userQuery = `SELECT nuc, telef1 FROM \`bd_prueba.cliente_unico\` WHERE nuc = "${nuc}" AND telef1 = "${phone}"`;
    const optionsUser = {
        query: userQuery,
        location: "US-Central1",
    };
    // Run the query as a job
    const [jobUser] = yield bigQueryClient.createQueryJob(optionsUser);
    // Wait for the query to finish
    const [rowsUser] = yield jobUser.getQueryResults();
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
        const userToken = token_1.default.getJwtToken(user);
        return res.json({
            ok: true,
            token: userToken,
        });
        //insert into table clientes on dataset TecTable
        const query = `INSERT INTO TecTable.clientes (nuc, phone, password) VALUES ('${nuc}', '${phone}', '${password}')`;
        const options = {
            query: query,
            location: "US",
        };
        // Run the query as a job
        const [job] = yield bigQueryClient.createQueryJob(options);
        console.log(`Job ${job.id} started.`);
        // Wait for the query to finish
        const [rows] = yield job.getQueryResults();
        res.json({
            ok: true,
            message: "Usuario creado",
        });
    }
    else {
        return res.json({
            ok: false,
            message: "Usuario no encontrado",
        });
    }
}));
userRoutes.post("/register/password", authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bigQueryClient = new BigQuery();
    const { nuc, phone } = req.user;
    const userQuery = `SELECT nuc, telef1 FROM \`bd_prueba.cliente_unico\` WHERE nuc = "${nuc}" AND telef1 = "${phone}"`;
    const optionsUser = {
        query: userQuery,
        location: "US-Central1",
    };
    // Run the query as a job
    const [jobUser] = yield bigQueryClient.createQueryJob(optionsUser);
    // Wait for the query to finish
    const [rowsUser] = yield jobUser.getQueryResults();
    if (rowsUser.length === 0) {
        return res.json({
            ok: false,
            message: "Error al registrar contraseña",
        });
    }
    const { identificador, telef1 } = rowsUser[0];
    const nucUser = rowsUser[0].nuc;
    const password = bcrypt_1.default.hashSync(req.body.password, 10);
    const user = {
        nuc: nucUser,
        phone: telef1,
        password: password,
    };
    if (nucUser === nuc && telef1 === phone) {
        // find nuc and phone in table clientes on dataset TecTable
        const queryFind = `SELECT nuc, phone FROM TecTable.clientes WHERE nuc = "${nuc}" AND phone = "${phone}"`;
        const optionsFind = {
            query: queryFind,
            location: "US",
        };
        // Run the query as a job
        const [jobFind] = yield bigQueryClient.createQueryJob(optionsFind);
        // Wait for the query to finish
        const [rowsFind] = yield jobFind.getQueryResults();
        if (rowsFind.length !== 0) {
            return res.json({
                ok: false,
                message: "Usuario ya registrado",
            });
        }
        //insert into table clientes on dataset TecTable if not exist nuc and phone
        const query = `INSERT INTO TecTable.clientes (nuc, phone, password) VALUES ('${user.nuc}', '${user.phone}', '${user.password}')`;
        const options = {
            query: query,
            location: "US",
        };
        // Run the query as a job
        const [job] = yield bigQueryClient.createQueryJob(options).catch((err) => {
            return res.json({
                ok: false,
                message: "Error al registrar contraseña",
            });
        });
        // Wait for the query to finish
        const [rows] = yield job.getQueryResults();
        console.log("Creado", rows);
        return res.json({
            ok: true,
            message: "Usuario registradp con exito",
        });
    }
}));
userRoutes.put("/", (req, res) => {
    res.json({
        ok: true,
        message: "PUT",
    });
});
userRoutes.delete("/", (req, res) => {
    res.json({
        ok: true,
        message: "DELETE",
    });
});
exports.default = userRoutes;

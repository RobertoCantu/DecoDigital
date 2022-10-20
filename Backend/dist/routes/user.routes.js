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
Object.defineProperty(exports, "__esModule", { value: true });
//Plantilla
const express_1 = require("express");
// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
require("dotenv").config();
const firebase = require('../firebase');
const { google } = require('googleapis');
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
    const userQuery = `SELECT identificador, nuc, telef1 FROM \`bd_prueba.cliente_unico\` WHERE nuc = "${nuc}" AND telef1 = "${phone}"`;
    const optionsUser = {
        query: userQuery,
        location: 'US-Central1',
    };
    // Run the query as a job
    const [jobUser] = yield bigQueryClient.createQueryJob(optionsUser);
    // Wait for the query to finish
    const [rowsUser] = yield jobUser.getQueryResults();
    const { identificador, telef1 } = rowsUser[0];
    const nucUser = rowsUser[0].nuc;
    console.log(nucUser, nuc);
    console.log(telef1, phone);
    if (nucUser === nuc && telef1 === phone) {
        //insert into table clientes on dataset TecTable
        const query = `INSERT INTO TecTable.clientes (nuc, phone, password) VALUES ('${nuc}', '${phone}', '${password}')`;
        const options = {
            query: query,
            location: 'US',
        };
        // Run the query as a job
        const [job] = yield bigQueryClient.createQueryJob(options);
        console.log(`Job ${job.id} started.`);
        // Wait for the query to finish
        const [rows] = yield job.getQueryResults();
        console.log('Rows:');
        rows.forEach((row) => console.log(row));
        res.json({
            ok: true,
            message: "Usuario creado",
        });
    }
    else {
        return res.json({
            ok: false,
            message: "Usuario no encontrado"
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

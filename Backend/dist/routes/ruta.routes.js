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
const { google } = require('googleapis');
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
            const [dataset] = yield bigqueryClient.createDataset('TecTable');
            console.log(`Dataset ${dataset.id} created.`);
        });
    }
    createDataset();
    res.json({
        ok: true,
        message: "lol",
    });
});
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
exports.default = rutaRoutes;

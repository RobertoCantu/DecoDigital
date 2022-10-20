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
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const rutaRoutes = (0, express_1.Router)();
//Ruta protegida por el jwt
// rutaRoutes.get("/", verifyToken, (req: any, res: Response) => {
rutaRoutes.get("/", (req, res) => {
    const user = req.user;
    getUser();
    res.json({
        ok: true,
        message: "GET2",
    });
});
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://bigquery.googleapis.com/bigquery/v2/projects/driven-rig-363116/datasets/bd_prueba/tables/colonia/data", {
                headers: {
                    Authorization: "Bearer " +
                        "ya29.a0Aa4xrXOa66IzJupJYzU5ROthgNqGxwZHFOqHmrUSzObwJl2Dd1V4JSmCQuIDOTZ12BRE2wzbX_HWPG3smVFVdE90pxMCysEcpgqEecFC6UxuiG37e_xtC1ER5olSXrGyn0I4bxW5Ox9lHjyBTSMToD2oo6Reg4bcTA8Rdoyt1nM3e0xgau1yBEvFLMn5RFHwB3g1VxwdgfRYMk1BjHU6pDxG2X_Zvl5DvujF-OMs-acOMZ2KQQeupPUqEjn3XrvLIKGJRdUaCgYKATASARISFQEjDvL9pLaTYukouVRY6K1Vg5Z0Vg0270",
                },
            });
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    });
}
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

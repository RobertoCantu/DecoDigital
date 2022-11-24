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
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailRoutes = (0, express_1.Router)();
mailRoutes.post("/report/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { contract, message } = req.body;
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_USERNAME_RECEIVER,
        subject: "Reporte de producto",
        text: `Reporte de producto ${contract} con id: ${id}. \n ${message}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: "Error al enviar el correo",
            });
        }
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({
            ok: true,
            message: "Correo enviado",
        });
    });
}));
mailRoutes.post("/report/estado/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { contract, nuc } = req.body;
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_USERNAME_RECEIVER,
        subject: "Reporte de estado de cuenta",
        text: `Reporte de estado de cuenta: ${contract}. \n NUC: ${nuc}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: "Error al enviar el correo",
            });
        }
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({
            ok: true,
            message: "Correo enviado",
        });
    });
}));
exports.default = mailRoutes;

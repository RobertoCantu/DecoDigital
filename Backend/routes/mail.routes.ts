import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { verifyToken } from '../middlewares/authentication';
const mailRoutes = Router();

mailRoutes.post("/report/product/:id", async (req: any, res: Response) => {
  const id = req.params.id;

  const { contract, message} = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
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
});

mailRoutes.post("/report/estado/:id", async (req: any, res: Response) => {
  const id = req.params.id;

  const {contract, nuc} = req.body;

  let transporter = nodemailer.createTransport({
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
});

export default mailRoutes;

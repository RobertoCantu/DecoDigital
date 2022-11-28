import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { verifyToken } from '../middlewares/authentication';
const mailRoutes = Router();


//Endpoint para enviar el reporte de un producto
mailRoutes.post("/report/product/:id", async (req: any, res: Response) => {
  const id = req.params.id;

  const { contract, message} = req.body;
  
  /*
    Crea el objeto de transporte con el host de outlook y las credenciales del correo
    que se encargara de enviar los correos lo obtiene desde el .env bajo el nombre de
    MAIL_USERNAME y MAIL_PASSWORD
   */
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  /*
    Crea el objeto de correo electronico con el remitente, destinatario, asunto y cuerpo
    y lo mand al correo de soporte obtenido desde el .env bajo el nombre de MAIL_USERNAME_RECEIVER
  */ 

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: process.env.MAIL_USERNAME_RECEIVER,
    subject: "Reporte de producto",
    text: `Reporte de producto ${contract} con id: ${id}. \n ${message}`,
  };

  /*
    Envia el correo electronico 
  */

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

//Endpoint para enviar el reporte de un estado de cuenta

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

import Server from "./classes/server";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rutaRoutes from "./routes/ruta.routes";
import userRoutes from "./routes/user.routes";
import mailRoutes from './routes/mail.routes';
require("./firebase")
const server = new Server();



// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Configurar CORS
server.app.use(cors({origin: true, credentials: true}));

// Rutas de servicios
server.app.use('/api/ruta',rutaRoutes);
server.app.use('/api/user',userRoutes);
server.app.use('/api/mail',mailRoutes);




server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});


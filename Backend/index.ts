import Server from "./classes/server";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rutaRoutes from "./routes/ruta.routes";

const server = new Server();




// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Configurar CORS
server.app.use(cors({origin: true, credentials: true}));

// Rutas de servicios
server.app.use('/api/ruta',rutaRoutes);



server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});


"use strict";
exports.__esModule = true;
var server_1 = require("./classes/server");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var ruta_routes_1 = require("./routes/ruta.routes");
var server = new server_1["default"]();
// Body parser
server.app.use(body_parser_1["default"].urlencoded({ extended: true }));
server.app.use(body_parser_1["default"].json());
// Configurar CORS
server.app.use((0, cors_1["default"])({ origin: true, credentials: true }));
// Rutas de servicios
server.app.use('/api/ruta', ruta_routes_1["default"]);
server.start(function () {
    console.log("Servidor corriendo en el puerto ".concat(server.port));
});

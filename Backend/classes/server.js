"use strict";
exports.__esModule = true;
var path_1 = require("path");
require('dotenv').config({ path: path_1["default"].resolve(__dirname, '../.env') });
var express_1 = require("express");
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1["default"])();
        this.port = Number(process.env.PORT) || 3000;
    }
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
    };
    return Server;
}());
exports["default"] = Server;

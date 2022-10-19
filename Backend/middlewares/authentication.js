"use strict";
exports.__esModule = true;
exports.verifyToken = void 0;
var token_1 = require("../classes/token");
var verifyToken = function (req, res, next) {
    var userToken = req.get("x-token") || "";
    token_1["default"].checkToken(userToken)
        .then(function (decoded) {
        req.user = decoded.user;
        next();
    })["catch"](function (err) {
        res.json({
            ok: false,
            message: "Invalid token"
        });
    });
};
exports.verifyToken = verifyToken;

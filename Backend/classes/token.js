"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.getJwtToken = function (payload) {
        return jsonwebtoken_1["default"].sign({
            user: payload
        }, this.seed, { expiresIn: this.expires });
    };
    Token.checkToken = function (userToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1["default"].verify(userToken, _this.seed, function (err, decoded) {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    };
    Token.seed = process.env.SEED || 'este-es-el-seed-desarrollo';
    Token.expires = "30d";
    return Token;
}());
exports["default"] = Token;

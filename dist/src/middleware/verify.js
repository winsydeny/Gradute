"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../jwt"));
const jwt = new jwt_1.default();
exports.default = (req, res, next) => {
    // 改为header 传输
    const token = req.query.token || req.body.token;
    console.log(req.get("access_token"));
    if (req.path === "/api/login" ||
        req.path === "/api/register/send" ||
        req.path === "/api/register" ||
        req.path === "/api/register/personal" ||
        req.path === "/api/upload/attach") {
        next();
        return false;
    }
    try {
        jwt.verifyToken(token);
        next();
    }
    catch (e) {
        res.send({
            status: -1,
            success: false,
            message: "The Token is woring!!!",
            error: e
        });
    }
};

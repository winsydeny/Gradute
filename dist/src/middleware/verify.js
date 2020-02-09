"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../jwt"));
const jwt = new jwt_1.default();
exports.default = (req, res, next) => {
    const { token } = req.query;
    try {
        const result = jwt.verifyToken(token);
        next(result);
    }
    catch (e) {
        res.send({
            success: false,
            message: "The Token is woring!",
            error: e
        });
    }
};

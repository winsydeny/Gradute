"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const jwt_1 = __importDefault(require("../jwt"));
const Route = express.Router();
const jwt = new jwt_1.default();
Route.get("/", (req, res) => {
    const rs = req.body;
    console.log(rs);
    res.send({
        success: true
        // token: jwt.generateToken()
    });
});
Route.post("/test", (req, res) => {
    // console.log("=> /api/upload/test");
    const { token } = req.body;
    const rs = jwt.verifyToken(token);
    res.send({
        success: true,
        rs: rs
    });
});
Route.get("/token", (req, res) => {
    // console.log("=> /api/upload/token");
    // const { token } = req.query;
    // try {
    //   const rs = jwt.verifyToken(token);
    //   res.send({
    //     result: rs
    //   });
    // } catch (e) {
    //   res.send({ error: e });
    // }
    res.send({
        success: true,
        message: "already verify"
    });
    // const {token} = req.query
    // cosnt rs = jwt.verifyToken(token)
    // res.send({
    //   success:true,
    //   rs:rs
    // })
});
exports.default = Route;

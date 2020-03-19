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
const mysql = __importStar(require("mysql"));
const mysql_1 = __importDefault(require("../db/mysql"));
const jwt_1 = __importDefault(require("../jwt"));
const jwt = new jwt_1.default();
const Route = express.Router();
// body 请求参数类型为 x-www-form-urlencoded / json（不支持form-data）
Route.post("/", (req, res) => {
    console.log(req.body);
    const { email, passcode } = req.body;
    const token = jwt.generateToken(email);
    const con = mysql.createConnection(mysql_1.default);
    const sql = `select email,passcode from find_users where email='${email}' and passcode='${passcode}'`;
    con.query(sql, (err, data) => {
        // console.log(data);
        if (err) {
            console.log(err);
            return false;
        }
        if (data.length === 1) {
            res.send({ status: 0, access_token: token, msg: "login success" });
            return false;
        }
        res.send({
            status: 10009,
            msg: "无此用户或者账号密码错误"
        });
        con.end();
    });
    // if (email && passcode) {
    //   res.send({ status: 0, token: token, msg: "login success" });
    //   return false;
    // }
    // res.send({
    //   status: 0,
    //   msg: "user and passcode is must be required"
    // });
});
exports.default = Route;

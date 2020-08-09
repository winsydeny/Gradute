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
const uuid_1 = require("uuid");
const mysql_1 = __importDefault(require("../db/mysql"));
// import Jwt from "../jwt";
// const jwt = new Jwt();
const Route = express.Router();
// body 请求参数类型为 x-www-form-urlencoded（不支持form-data）
Route.post("/", (req, res) => {
    console.log(req.body);
    let { position, company, location, type, preview, salary, description, experience } = req.body;
    if (preview === undefined) {
        preview = "https://facebook.github.io/react-native/img/tiny_logo.png";
    }
    //   console.log(uuidv1());
    const uuid = uuid_1.v1();
    const created = new Date().getTime();
    const con = mysql.createConnection(mysql_1.default);
    const sql = `insert into find_joblist (uuid,position,company,location,type,preview,created,salary,description,experience) values ('${uuid}','${position}','${company}','${location}','${type}','${preview}','${created}','${salary}','${description}','${experience}')`;
    con.query(sql, (err, data) => {
        if (err) {
            res.send({
                status: 10001,
                err: err
            });
            return false;
        }
        res.send({
            status: 0,
            msg: "ok"
        });
        con.end();
    });
});
exports.default = Route;

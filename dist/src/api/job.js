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
const Route = express.Router();
const mongo_1 = require("../db/mongo");
const mysql_1 = __importDefault(require("../db/mysql"));
Route.get("/", (req, res) => {
    const con = mysql.createConnection(mysql_1.default);
    const sql = `select * from find_joblist`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("查询失败");
            return false;
        }
        res.send({
            status: 0,
            msg: "ok",
            data: data
        });
    });
    mongo_1.User.find({}, (err, rs) => {
        if (!err) {
            res.send({
                success: true,
                data: rs
            });
        }
        else {
            res.send("fail");
        }
    });
    // res.send("sd");
});
Route.post("/submit", (req, res) => {
    const { uid, hr_id, email } = req.body;
    res.send({ data: req.body });
    // res.send({
    //   success: true,
    //   data: [
    //     {
    //       uid: uid,
    //       hr_id: hr_id,
    //       email: email
    //     }
    //   ]
    // });
});
exports.default = Route;

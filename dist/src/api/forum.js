"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const mysql_1 = __importDefault(require("../db/mysql"));
const utlis_1 = require("../utlis");
const uuid_1 = require("uuid");
// localhost:3000/api/forum
Route.post("/", (req, res) => {
    const { email, user, avatar, content, thumb, comment, created } = req.body;
    const con = mysql.createConnection(mysql_1.default);
    const sql = `insert into find_forum (uid, email, user, avatar, content, thumb, comment, created) values ('${uuid_1.v1()}','${email}','${user}','${avatar}','${content}','${thumb}','${comment}','${created}')`;
    try {
        const result = utlis_1._query(con, sql);
        if (result.affectRows === 0) {
            res.send({ status: -1, msg: "fali" });
            return false;
        }
        res.send({ status: 0, msg: "ok" });
    }
    catch (e) {
        res.send({
            status: "error",
            msg: "数据库失败"
        });
        // console.log(e);
        return false;
    }
});
Route.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `select * from find_forum`;
    const con = mysql.createConnection(mysql_1.default);
    try {
        const result = yield utlis_1._query(con, sql);
        // console.log(result);
        res.send({
            status: 0,
            msg: "ok",
            data: result
        });
    }
    catch (e) {
        // console.log(e);
        return false;
    }
}));
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

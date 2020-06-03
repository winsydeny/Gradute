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
const nodemailer_1 = __importDefault(require("nodemailer"));
const mysql_1 = __importDefault(require("../db/mysql"));
const jwt_1 = __importDefault(require("../jwt"));
const utlis_1 = require("../utlis");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: "1395854149@qq.com",
        pass: "bkjoxojumulyibbf"
    }
});
function sendEmail(client, url) {
    const emailMessage = {
        from: '"Find " <1395854149@qq.com>',
        to: client,
        subject: "Upload you resume",
        text: "attachment",
        html: `<div><a href='${url}'>click here to upload</a><p>${url}</p></div>`
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(emailMessage, (err, res) => {
            if (err) {
                reject(false);
                return false;
            }
            resolve(true);
        });
    });
}
const Route = express.Router();
Route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const jwt = new jwt_1.default();
    const info = jwt.verifyToken(data.token);
    const { v, type } = req.query;
    console.log(typeof type);
    const DB_TABLE = type === "1" ? "find_users" : "find_user_info";
    // const sql = `insert into find_user_info (${v}) select '${info.email}' from dual where not EXISTS (select ${v} from find_user_info where email='${info.email}')`;
    const sql = `update ${DB_TABLE} set ${v}='${data[v]}' where email='${info.email}'`;
    // const sql = `insert into find_user_info (${v}) values ('${data[v]}') where email='${info.email}'`;
    const con = mysql.createConnection(mysql_1.default);
    try {
        const result = yield utlis_1._query(con, sql);
        if (result.affectedRows > 0) {
            res.send({
                status: 0,
                msg: "ok"
            });
            return false;
        }
        res.send({
            status: -1,
            msg: "saved fail"
        });
        console.log(result);
    }
    catch (e) {
        res.send({
            status: -1,
            msg: "saved fail"
        });
        console.log(e);
    }
}));
Route.get("/info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { } = req.query;
    const { token } = req.query;
    const jwt = new jwt_1.default();
    const info = jwt.verifyToken(token);
    // const sql =
    // "select * from find_users inner join find_user_info on user.email";
    const SQL_USER = `select user,cellphone from find_users where email='${info.email}'`;
    const SQL_IFNO = `select * from find_user_info where email='${info.email}'`;
    // select * from user inner join user2 on user.age = user2.age;
    const con = mysql.createConnection(mysql_1.default);
    const con_1 = mysql.createConnection(mysql_1.default);
    try {
        const result = yield utlis_1._query(con, SQL_USER);
        const info = yield utlis_1._query(con_1, SQL_IFNO);
        res.send({
            status: 0,
            msg: "ok",
            data: Object.assign(result[0], info[0])
        });
    }
    catch (e) {
        console.log(e);
        res.send({
            status: 9999,
            msg: "error"
        });
    }
}));
Route.get("/attach", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const { token } = req.query;
    const jwt = new jwt_1.default();
    const info = jwt.verifyToken(token);
    const url = `https://www.vanlansh.wang/api/upload/files?token=${token}`;
    try {
        yield sendEmail(info.email, url);
        res.send({
            status: 0,
            msg: "ok"
        });
    }
    catch (e) {
        res.send({ status: -1, msg: "fail" });
    }
}));
// Route.post('/personal',async(req:any,res:any) => {
//   const req.
//   const sql = `update find_users set ${v}=${data[v]} where email='${email}'`
// })
exports.default = Route;

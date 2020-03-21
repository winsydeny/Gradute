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
const uuid_1 = require("uuid");
const utlis_1 = require("../utlis");
const Route = express.Router();
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: "1395854149@qq.com",
        pass: "bkjoxojumulyibbf"
    }
});
function generateCode() {
    let Num = "";
    for (let i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Number(Num);
}
function sendEmail(client, code) {
    const emailMessage = {
        from: '"Find " <1395854149@qq.com>',
        to: client,
        subject: "Register ✔",
        text: "Hello world?",
        html: `<div>Your code is: <h3>${code}</h3></div>`
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
function addUser(item) {
    const { uid, user, email, user_info, identity, passcode } = item;
    return `insert into find_users (uid,user,email,user_info,identity,passcode) values ('${uid}','${user}','${email}','${user_info}','${identity}','${passcode}')`;
}
Route.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("this is send", req.body);
    const { email } = req.body;
    const verifyCode = generateCode();
    console.log(email);
    const con = mysql.createConnection(mysql_1.default);
    const sql = `insert into find_register (email,code) select '${email}',${verifyCode} from DUAL  where not exists (select email from find_register where email='${email}')`;
    // const sql = `insert into find_register (email,code) values ('${email}',${verifyCode})`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("database fail");
            return false;
        }
        if (data.affectedRows === 0) {
            res.send({
                status: 20000,
                msg: "此邮箱已注册"
            });
            return false;
        }
        sendEmail(email, verifyCode)
            .then(result => {
            if (result) {
                res.send({
                    status: 0,
                    msg: "ok"
                });
            }
        })
            .catch(err => {
            res.send({
                status: 10002,
                msg: "send email failed"
            });
        });
        con.end(); //close mysql connect
    });
}));
Route.post("/personal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cellphone, email } = req.body;
    const con = mysql.createConnection(mysql_1.default);
    const sql = `update find_users set user='${name}',cellphone='${cellphone}' where email='${email}'`;
    const result = yield utlis_1._query(con, sql);
    if (result.affectedRows === 1) {
        res.send({
            status: 0,
            msg: "ok"
        });
        return false;
    }
    res.send({
        status: -1,
        msg: "fail"
    });
}));
Route.post("/", (req, res) => {
    const { code, email, passcode } = req.body;
    const con = mysql.createConnection(mysql_1.default);
    const sql = `select * from find_register where code=${code} and email='${email}'`;
    const uuid = uuid_1.v1();
    const user = {
        uid: uuid,
        user: "hhhhh",
        email: email,
        user_info: 1,
        identity: "",
        passcode: passcode
    };
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return false;
        }
        if (result.length <= 0) {
            res.send({
                status: 20001,
                msg: "验证码错误"
            });
            return false;
        }
        con.query(addUser(user), (e, r) => {
            if (e) {
                console.log("err,add new user");
                return false;
            }
        });
        res.send({
            status: 0,
            msg: "ok",
            uuid: uuid
        });
        con.end();
    });
});
exports.default = Route;

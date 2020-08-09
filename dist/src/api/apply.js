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
Route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, user, uuid, position } = req.body;
    const aid = uuid_1.v1();
    const con = mysql.createConnection(mysql_1.default);
    const sql = `insert into find_apply_job (email,user,job_uuid,created,position,aid) select '${email}','${user}','${uuid}','${new Date().getTime()}','${position}','${aid}' from DUAL where not exists (select job_uuid from find_apply_job where job_uuid='${uuid}')`;
    // const sql = `insert into find_apply_job (email,user,job_uuid,created) values ('${email}','${user}','${uuid}','${new Date().getTime()}')`;
    try {
        const result = yield utlis_1._query(con, sql);
        // console.log(result);
        if (result.affectedRows === 0) {
            res.send({
                status: 10004,
                msg: "can not apply again"
            });
            return false;
        }
        res.send({
            status: 0,
            msg: "apply success"
        });
    }
    catch (e) {
        console.log(e);
    }
    // res.send("sd");
}));
Route.get("/agent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const con = mysql.createConnection(mysql_1.default);
    const sql = "select * from find_apply_job where apply=0";
    try {
        const rs = yield utlis_1._query(con, sql);
        res.send({
            status: 0,
            msg: "ok",
            data: rs
        });
    }
    catch (e) {
        console.log(e);
    }
}));
Route.get("/record", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //token 解析 后获取email查询
    console.log(req.query);
    const con = mysql.createConnection(mysql_1.default);
    const sql = `select * from find_apply_job where status=${req.query.status} and apply=${req.query.apply}`;
    try {
        const rs = yield utlis_1._query(con, sql);
        res.send({
            status: 0,
            msg: "ok",
            data: rs
        });
    }
    catch (e) {
        console.log(e);
    }
}));
Route.post("/invite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, datetime, job_uuid } = req.body;
    const con = mysql.createConnection(mysql_1.default);
    const vid = uuid_1.v1();
    // console.log(job_uuid);
    const sql = `update find_apply_job set location='${location}',time='${datetime}',vid='${vid}',apply=1 where job_uuid='${job_uuid}'`;
    // const sql = `insert into find_apply_job (location,time,vid,apply) values ('${location}','${datetime}','${vid}',1)`;
    // const sql = `insert into find_apply_job (location,time,vid,apply) select '${location}','${datetime}','${vid}',1 from DUAL where exists (select job_uuid from find_apply_job where job_uuid='${job_uuid}')`;
    console.log(sql);
    try {
        const result = yield utlis_1._query(con, sql);
        console.log(result);
        if (result.affectedRows === 0) {
            res.send({
                status: 10004,
                msg: "can not apply again"
            });
            return false;
        }
        res.send({
            status: 0,
            msg: "invite success"
        });
    }
    catch (e) {
        console.log(e);
    }
}));
exports.default = Route;

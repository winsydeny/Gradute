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
const mysql_1 = __importDefault(require("../db/mysql"));
const utlis_1 = require("../utlis");
const Route = express.Router();
Route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const user = "xijia";
    const con = mysql.createConnection(mysql_1.default);
    const sql = `insert into feedback (user,ip,time,content) values ('${user}','${req.ip}','${new Date().getTime()}','${content}') `;
    try {
        const result = yield utlis_1._query(con, sql);
        res.send({
            status: 0,
            msg: "ok"
        });
    }
    catch (e) {
        console.log(e);
    }
}));
exports.default = Route;

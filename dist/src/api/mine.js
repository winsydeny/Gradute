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
const jwt_1 = __importDefault(require("../jwt"));
const jwt = new jwt_1.default();
Route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const con = mysql.createConnection(mysql_1.default);
    const USERINFO = jwt.verifyToken(token);
    console.log(USERINFO);
    const sql = `select * from find_users where email='${USERINFO.email}'`;
    try {
        const result = yield utlis_1._query(con, sql);
        res.send({
            status: 0,
            msg: "ok",
            data: result
        });
    }
    catch (e) {
        console.log(e);
    }
    // con.query(sql, (err, data) => {
    //   if (err) {
    //     console.log("查询失败");
    //     return false;
    //   }
    //   res.send({
    //     status: 0,
    //     msg: "ok",
    //     data: data
    //   });
    // });
    // res.send("sd");
}));
exports.default = Route;

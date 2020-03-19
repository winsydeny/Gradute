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
// body 请求参数类型为 x-www-form-urlencoded（不支持form-data）
/**
 * 模糊查找（关键字，公司名称，职位名称）
 * params:
 *  {
 *      keyword: String, 关键词
 *      longitude: String, 经度
 *      latitude: String, 纬度
 *      filter: Array,  关键词过滤
 *      page: Number [1], 第几页
 *      size: Number [10] 每页数量
 *  }
 */
Route.get("/", (req, res) => {
    const size = req.query.size || 10;
    const page = req.query.page || 1;
    const start = (page - 1) * size; //start number
    // console.log(req.query)
    const con = mysql.createConnection(mysql_1.default);
    // limit ' + start + ',20'
    // const sql: string =`select * from find_users limit ${start},${size}`;
    // 通过关键词查找并且分页
    const sql = `select * from find_joblist where position like '%${req.query.keyword}%' limit ${start},${size}`;
    con.connect();
    con.query(sql, (err, data) => {
        if (err) {
            res.send({
                status: 10001,
                msg: err
            });
            return false;
        }
        res.send({
            status: 0,
            msg: "ok",
            data: data
        });
    });
    con.end();
});
exports.default = Route;

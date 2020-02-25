import * as express from "express";
import * as mysql from 'mysql';
import Requset from '../d.ts/index';
import config from "../db/mysql"
import { User } from "../db/mongo";
import Jwt from "../jwt";
const jwt = new Jwt();
const Route: any = express.Router();
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
Route.get("/", (req: Requset, res: any) => {
  const size = req.query.size || 10
  const page = req.query.page || 1
  const start = (page - 1) * size //start number
  // console.log(req.query)
  const con = mysql.createConnection(config)
  // limit ' + start + ',20'
  // const sql: string =`select * from find_users limit ${start},${size}`;
  const sql: string =`select * from find_users where user like '%${req.query.keyword}%' limit ${start},${size}`;
  con.connect();
  con.query(sql,(err,data) => {
    if(err){
      res.send({
          status:10001,
          msg:err
      })
      return false;
    }
    res.send({
        status:0,
        msg:data
    })
  })
  con.end();
});

export default Route;

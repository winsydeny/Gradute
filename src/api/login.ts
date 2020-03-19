import * as express from "express";
import * as mysql from "mysql";
import Requset from "../d.ts/index";
import config from "../db/mysql";
import { User } from "../db/mongo";
import Jwt from "../jwt";
const jwt = new Jwt();
const Route: any = express.Router();
// body 请求参数类型为 x-www-form-urlencoded / json（不支持form-data）
Route.post("/", (req: Requset, res: any) => {
  console.log(req.body);

  const { email, passcode } = req.body;
  const token = jwt.generateToken(email);
  const con = mysql.createConnection(config);
  const sql = `select email,passcode from find_users where email='${email}' and passcode='${passcode}'`;
  con.query(sql, (err, data) => {
    // console.log(data);
    if (err) {
      console.log(err);
      return false;
    }

    if (data.length === 1) {
      res.send({ status: 0, access_token: token, msg: "login success" });
      return false;
    }
    res.send({
      status: 10009,
      msg: "无此用户或者账号密码错误"
    });
    con.end();
  });

  // if (email && passcode) {
  //   res.send({ status: 0, token: token, msg: "login success" });
  //   return false;
  // }
  // res.send({
  //   status: 0,
  //   msg: "user and passcode is must be required"
  // });
});

export default Route;

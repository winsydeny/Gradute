import * as express from "express";
import Requset from "../d.ts/index";
import * as mysql from "mysql";
import { User } from "../db/mongo";
import { v1 as uuidv1 } from "uuid";
import config from "../db/mysql";

// import Jwt from "../jwt";
// const jwt = new Jwt();
const Route: any = express.Router();
// body 请求参数类型为 x-www-form-urlencoded（不支持form-data）
Route.post("/", (req: Requset, res: any) => {
  console.log(req.body);
  let {
    position,
    company,
    location,
    type,
    preview,
    salary,
    description,
    experience
  } = req.body;
  if (preview === undefined) {
    preview = "https://facebook.github.io/react-native/img/tiny_logo.png";
  }
  //   console.log(uuidv1());
  const uuid = uuidv1();
  const created = new Date().getTime();
  const con = mysql.createConnection(config);
  const sql = `insert into find_joblist (uuid,position,company,location,type,preview,created,salary,description,experience) values ('${uuid}','${position}','${company}','${location}','${type}','${preview}',${created},${salary},'${description}',${experience})`;
  con.query(sql, (err, data) => {
    if (err) {
      res.send({
        status: 10001,
        err: err
      });
      return false;
    }
    res.send({
      status: 0,
      msg: "ok"
    });
    con.end();
  });
});

export default Route;

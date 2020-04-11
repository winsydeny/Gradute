import * as express from "express";
import * as mysql from "mysql";
const Route: any = express.Router();
import { User } from "../db/mongo";
import config from "../db/mysql";
import { _query } from "../utlis";
import Jwt from "../jwt";
interface Request {
  body: RequestBody;
}
interface RequestBody {
  uid: number;
  hr_id: number;
  email: string;
}
const jwt = new Jwt();
Route.get("/", async (req: any, res: any) => {
  const { token } = req.query;
  const con = mysql.createConnection(config);
  const USERINFO: any = jwt.verifyToken(token);
  console.log(USERINFO);
  const sql = `select * from find_users where email='${USERINFO.email}'`;
  try {
    const result = await _query(con, sql);
    res.send({
      status: 0,
      msg: "ok",
      data: result
    });
  } catch (e) {
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
});

export default Route;

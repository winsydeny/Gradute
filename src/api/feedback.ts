import * as express from "express";
import * as mysql from "mysql";
import config from "../db/mysql";
import { _query } from "../utlis";
const Route: any = express.Router();
Route.post("/", async (req: any, res: any) => {
  const { content } = req.body;
  const user = "xijia";
  const con = mysql.createConnection(config);
  const sql = `insert into feedback (user,ip,time,content) values ('${user}','${
    req.ip
  }','${new Date().getTime()}','${content}') `;
  try {
    const result = await _query(con, sql);
    res.send({
      status: 0,
      msg: "ok"
    });
  } catch (e) {
    console.log(e);
  }
});

export default Route;

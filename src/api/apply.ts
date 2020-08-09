import * as express from "express";
import * as mysql from "mysql";
const Route: any = express.Router();
import { User } from "../db/mongo";
import config from "../db/mysql";
import { _query } from "../utlis";
import { v1 as uuidv1 } from "uuid";

interface Request {
  body: RequestBody;
}
interface RequestBody {
  uid: number;
  hr_id: number;
  email: string;
}

Route.post("/", async (req: any, res: any) => {
  const { email, user, uuid, position } = req.body;
  const aid = uuidv1();
  const con = mysql.createConnection(config);
  const sql = `insert into find_apply_job (email,user,job_uuid,created,position,aid) select '${email}','${user}','${uuid}','${new Date().getTime()}','${position}','${aid}' from DUAL where not exists (select job_uuid from find_apply_job where job_uuid='${uuid}')`;
  // const sql = `insert into find_apply_job (email,user,job_uuid,created) values ('${email}','${user}','${uuid}','${new Date().getTime()}')`;
  try {
    const result: any = await _query(con, sql);
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
  } catch (e) {
    console.log(e);
  }
  // res.send("sd");
});
Route.get("/agent", async (req: any, res: any) => {
  const con = mysql.createConnection(config);
  const sql = "select * from find_apply_job where apply=0";
  try {
    const rs: any = await _query(con, sql);
    res.send({
      status: 0,
      msg: "ok",
      data: rs
    });
  } catch (e) {
    console.log(e);
  }
});
Route.get("/record", async (req: any, res: any) => {
  //token 解析 后获取email查询
  console.log(req.query);
  const con = mysql.createConnection(config);
  const sql = `select * from find_apply_job where status=${req.query.status} and apply=${req.query.apply}`;
  try {
    const rs: any = await _query(con, sql);
    res.send({
      status: 0,
      msg: "ok",
      data: rs
    });
  } catch (e) {
    console.log(e);
  }
});
Route.post("/invite", async (req: any, res: any) => {
  const { location, datetime, job_uuid } = req.body;
  const con = mysql.createConnection(config);
  const vid = uuidv1();
  // console.log(job_uuid);
  const sql = `update find_apply_job set location='${location}',time='${datetime}',vid='${vid}',apply=1 where job_uuid='${job_uuid}'`;
  // const sql = `insert into find_apply_job (location,time,vid,apply) values ('${location}','${datetime}','${vid}',1)`;
  // const sql = `insert into find_apply_job (location,time,vid,apply) select '${location}','${datetime}','${vid}',1 from DUAL where exists (select job_uuid from find_apply_job where job_uuid='${job_uuid}')`;
  console.log(sql);
  try {
    const result: any = await _query(con, sql);
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
  } catch (e) {
    console.log(e);
  }
});

export default Route;

import * as express from "express";
import * as mysql from "mysql";
const Route: any = express.Router();
import { User } from "../db/mongo";
import config from "../db/mysql";
import { _query } from "../utlis";
import uuid from "uuid";
interface Request {
  body: RequestBody;
}
interface RequestBody {
  uid: number;
  hr_id: number;
  email: string;
}

// localhost:3000/api/forum
Route.post("/", (req: any, res: any) => {
  const { email, user, avatar, content, thumb, comment, created } = req.body;
  const con = mysql.createConnection(config);
  const sql = `insert into find_forum (email, user, avatar, content, thumb, comment, created) values ('${email}','${user}','${avatar}','${content}','${thumb}','${comment}','${created}')`;
  try {
    const result: any = _query(con, sql);
    if (result.affectRows === 0) {
      res.send({ status: -1, msg: "fali" });
      return false;
    }
    res.send({ status: 0, msg: "ok" });
  } catch (e) {
    res.send({
      status: "error",
      msg: "数据库失败"
    });
    // console.log(e);
    return false;
  }
});
Route.get("/list", async (req: any, res: any) => {
  const sql = `select * from find_forum`;
  const con = mysql.createConnection(config);
  try {
    const result = await _query(con, sql);
    // console.log(result);
    res.send({
      status: 0,
      msg: "ok",
      data: result
    });
  } catch (e) {
    // console.log(e);
    return false;
  }
});
Route.post("/submit", (req: Request, res: any) => {
  const { uid, hr_id, email } = req.body;
  res.send({ data: req.body });
  // res.send({
  //   success: true,
  //   data: [
  //     {
  //       uid: uid,
  //       hr_id: hr_id,
  //       email: email
  //     }
  //   ]
  // });
});

export default Route;

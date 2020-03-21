import * as express from "express";
import * as mysql from "mysql";
const Route: any = express.Router();
import { User } from "../db/mongo";
import config from "../db/mysql";
import { _query } from "../utlis";
interface Request {
  body: RequestBody;
}
interface RequestBody {
  uid: number;
  hr_id: number;
  email: string;
}

Route.post("/", async (req: any, res: any) => {
  const { email, user, uuid } = req.body;
  const con = mysql.createConnection(config);
  const sql = `insert into find_apply_job (email,user,job_uuid,created) select '${email}','${user}','${uuid}','${new Date().getTime()}' from DUAL where not exists (select job_uuid from find_apply_job where job_uuid='${uuid}')`;
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

import * as express from "express";
import * as mysql from "mysql";
import nodeMailer from "nodemailer";
import config from "../db/mysql";
import JWT from "../jwt";
import { _query } from "../utlis";
interface UserInfo {
  email?: string;
}
const transporter = nodeMailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true,
  auth: {
    user: "1395854149@qq.com",
    pass: "bkjoxojumulyibbf"
  }
});
function sendEmail(client: string, url: string) {
  const emailMessage = {
    from: '"Find " <1395854149@qq.com>', // sender address
    to: client, // list of receivers
    subject: "Upload you resume", // Subject line
    text: "attachment", // plain text body
    html: `<div><a herf='${url}'>click here to upload</a><p>${url}</p></div>`
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(emailMessage, (err, res) => {
      if (err) {
        reject(false);
        return false;
      }
      resolve(true);
    });
  });
}
const Route: any = express.Router();
Route.post("/", async (req: any, res: any) => {
  const data = req.body;
  const jwt = new JWT();
  const info: any = jwt.verifyToken(data.token);
  const { v, type } = req.query;
  console.log(typeof type);
  const DB_TABLE = type === "1" ? "find_users" : "find_user_info";
  // const sql = `insert into find_user_info (${v}) select '${info.email}' from dual where not EXISTS (select ${v} from find_user_info where email='${info.email}')`;
  const sql = `update ${DB_TABLE} set ${v}='${data[v]}' where email='${info.email}'`;
  // const sql = `insert into find_user_info (${v}) values ('${data[v]}') where email='${info.email}'`;
  const con = mysql.createConnection(config);
  try {
    const result: any = await _query(con, sql);
    if (result.affectedRows > 0) {
      res.send({
        status: 0,
        msg: "ok"
      });
      return false;
    }
    res.send({
      status: -1,
      msg: "saved fail"
    });
    console.log(result);
  } catch (e) {
    res.send({
      status: -1,
      msg: "saved fail"
    });
    console.log(e);
  }
});
Route.get("/info", async (req: any, res: any) => {
  // const { } = req.query;

  const { token } = req.query;
  const jwt = new JWT();
  const info: any = jwt.verifyToken(token);
  // const sql =
  // "select * from find_users inner join find_user_info on user.email";
  const SQL_USER = `select user,cellphone from find_users where email='${info.email}'`;
  const SQL_IFNO = `select * from find_user_info where email='${info.email}'`;

  // select * from user inner join user2 on user.age = user2.age;
  const con = mysql.createConnection(config);
  const con_1 = mysql.createConnection(config);
  try {
    const result: any = await _query(con, SQL_USER);
    const info: any = await _query(con_1, SQL_IFNO);
    res.send({
      status: 0,
      msg: "ok",
      data: Object.assign(result[0], info[0])
    });
  } catch (e) {
    console.log(e);
    res.send({
      status: 9999,
      msg: "error"
    });
  }
});
Route.get("/attach", async (req: any, res: any) => {
  console.log(req.query);
  const { token } = req.query;
  const jwt = new JWT();
  const info: any = jwt.verifyToken(token);
  const url = `https://www.vanlansh.wang/api/upload/files?token=${token}`;
  try {
    await sendEmail(info.email, url);
    res.send({
      status: 0,
      msg: "ok"
    });
  } catch (e) {
    res.send({ status: -1, msg: "fail" });
  }
});
// Route.post('/personal',async(req:any,res:any) => {
//   const req.
//   const sql = `update find_users set ${v}=${data[v]} where email='${email}'`
// })

export default Route;

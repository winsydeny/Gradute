import * as express from "express";
import * as mysql from "mysql";
import nodeMailer from "nodemailer";
import config from "../db/mysql";
import { v1 as uuidv1 } from "uuid";
import { _query } from "../utlis";
const Route = express.Router();
interface User {
  uid: string;
  user: string;
  email: string;
  user_info: Number;
  identity: string;
  passcode: string;
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
function generateCode() {
  let Num = "";
  for (let i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Number(Num);
}
function sendEmail(client: string, code: Number) {
  const emailMessage = {
    from: '"Find " <1395854149@qq.com>', // sender address
    to: client, // list of receivers
    subject: "Register ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>Your code is: <h3>${code}</h3></div>`
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
function addUser(item: User) {
  const { uid, user, email, user_info, identity, passcode } = item;
  return `insert into find_users (uid,user,email,user_info,identity,passcode) values ('${uid}','${user}','${email}','${user_info}','${identity}','${passcode}')`;
}
Route.post("/send", async (req: any, res: any) => {
  // console.log("this is send", req.body);
  const { email } = req.body;
  const verifyCode = generateCode();
  console.log(email);
  const con = mysql.createConnection(config);
  const sql = `insert into find_register (email,code) select '${email}',${verifyCode} from DUAL  where not exists (select email from find_register where email='${email}')`;
  // const sql = `insert into find_register (email,code) values ('${email}',${verifyCode})`;
  con.query(sql, (err, data) => {
    if (err) {
      console.log("database fail");
      return false;
    }
    if (data.affectedRows === 0) {
      res.send({
        status: 20000,
        msg: "此邮箱已注册"
      });
      return false;
    }
    sendEmail(email, verifyCode)
      .then(result => {
        if (result) {
          res.send({
            status: 0,
            msg: "ok"
          });
        }
      })
      .catch(err => {
        res.send({
          status: 10002,
          msg: "send email failed"
        });
      });
    con.end(); //close mysql connect
  });
});
Route.post("/personal", async (req: any, res: any) => {
  const { name, cellphone, email } = req.body;
  const con = mysql.createConnection(config);
  const sql = `update find_users set user='${name}',cellphone='${cellphone}' where email='${email}'`;
  const result: any = await _query(con, sql);
  if (result.affectedRows === 1) {
    res.send({
      status: 0,
      msg: "ok"
    });
    return false;
  }
  res.send({
    status: -1,
    msg: "fail"
  });
});
Route.post("/", (req: any, res: any) => {
  const { code, email, passcode } = req.body;
  const con = mysql.createConnection(config);
  const sql = `select * from find_register where code=${code} and email='${email}'`;
  const uuid = uuidv1();
  const user: User = {
    uid: uuid,
    user: "hhhhh",
    email: email,
    user_info: 1,
    identity: "",
    passcode: passcode
  };
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return false;
    }
    if (result.length <= 0) {
      res.send({
        status: 20001,
        msg: "验证码错误"
      });
      return false;
    }
    con.query(addUser(user), (e, r) => {
      if (e) {
        console.log("err,add new user");
        return false;
      }
    });
    res.send({
      status: 0,
      msg: "ok",
      uuid: uuid
    });
    con.end();
  });
});
export default Route;

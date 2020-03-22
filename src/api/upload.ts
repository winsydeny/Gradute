import * as express from "express";
import * as mysql from "mysql";
import multer from "multer";
import crypto from "crypto";
import Jwt from "../jwt";
import config from "../db/mysql";
import { _query } from "../utlis";

const Route: any = express.Router();
const jwt = new Jwt();
// control file store
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./tmp");
  },
  filename: (req, file, cb) => {
    const filename = crypto.createHash("md5");
    filename.update(new Date().getTime().toString(), "utf8");
    console.log("multer", file);
    let type = file.originalname.split(".");
    cb(null, `${filename.digest("hex")}.${type[type.length - 1]}`);
  }
});

const upload = multer({ storage: storage });
Route.post("/", upload.any(), async (req: any, res: any) => {
  // console.log("=> /api/upload/test");
  console.log("upload => ", req);
  let token = "";
  let sql = "";
  if (req.get("access_token") !== undefined) {
    token = req.get("access_token");
    const USERINFO: any = jwt.verifyToken(token);
    sql = `update find_user_info set online_resume='${req.files[0].path}' where email='${USERINFO.email}'`;
  } else {
    token = req.body.token;
    const USERINFO: any = jwt.verifyToken(token);
    sql = `update find_users set avatar='${req.files[0].path}' where email='${USERINFO.email}'`;
  }
  const con = mysql.createConnection(config);
  try {
    const rs = await _query(con, sql);
    res.send({
      status: 0,
      msg: "upload success",
      url: req.files[0].path
    });
  } catch (e) {
    res.send({
      status: -1,
      msg: "fail"
    });
  }
});

Route.get("/token", (req: any, res: any) => {
  // console.log("=> /api/upload/token");
  // const { token } = req.query;
  // try {
  //   const rs = jwt.verifyToken(token);
  //   res.send({
  //     result: rs
  //   });
  // } catch (e) {
  //   res.send({ error: e });
  // }
  res.send({
    success: true,
    message: "already verify"
  });
  // const {token} = req.query
  // cosnt rs = jwt.verifyToken(token)
  // res.send({
  //   success:true,
  //   rs:rs
  // })
});

export default Route;

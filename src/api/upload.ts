import * as express from "express";
import * as mysql from "mysql";
import multer from "multer";
import fs from "fs";
import crypto from "crypto";
import Jwt from "../jwt";
import config from "../db/mysql";
import { _query } from "../utlis";

const Route: any = express.Router();
const jwt = new Jwt();
// control file store
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/var/www/html/winsydeny.github.io/upload");
    // cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const filename = crypto.createHash("md5");
    filename.update(new Date().getTime().toString(), "utf8");
    let type = file.originalname.split(".");
    cb(null, `${filename.digest("hex")}.${type[type.length - 1]}`);
  }
});

const upload = multer({ storage: storage });
// upload avatar
Route.post("/", upload.any(), async (req: any, res: any) => {
  // console.log("=> /api/upload/test");

  console.log(req.get("access_token"));
  // if (req.get("access_token") !== undefined) {
  //   token = req.get("access_token");
  //   const USERINFO: any = jwt.verifyToken(token);
  //   sql = `update find_user_info set online_resume='${req.files[0].path}' where email='${USERINFO.email}'`;
  // } else {
  const token = req.query.token;
  console.log("upload => avatar", token);
  const USERINFO: any = jwt.verifyToken(token);
  const sql = `update find_users set avatar='/upload/${req.files[0].filename}' where email='${USERINFO.email}'`;
  // }
  const con = mysql.createConnection(config);
  try {
    const rs: any = await _query(con, sql);
    console.log(rs);
    if (rs.affectedRows > 0) {
      res.send({
        status: 0,
        msg: "upload success",
        url: "/upload/" + req.files[0].filename
      });
      return false;
    }
    res.send({
      status: 30001,
      msg: "upload failed"
    });
  } catch (e) {
    res.send({
      status: -1,
      msg: "fail"
    });
  }
});
//upload resume
Route.post("/attach", upload.any(), async (req: any, res: any) => {
  const token = req.query.token;
  console.log("access_token", token);
  console.log("req.files", req.files);
  // if (req.files.length > 0) {
  //   res.send("<h1>Upload success</h1>");
  // } else {
  //   res.send("Fail");
  // }
  try {
    const USERINFO: any = jwt.verifyToken(token);
    const sql = `update find_user_info set online_resume='${req.files[0].filename}' where email='${USERINFO.email}'`;
    const con = mysql.createConnection(config);
    console.log("attach => ", USERINFO);
    await _query(con, sql);
    res.send({
      status: 0,
      msg: "resume upload success",
      url: req.files[0].path
    });
  } catch (e) {
    res.send({
      status: -1,
      msg: "fail"
    });
  }
});
// upload page
Route.get("/files", (req: any, res: any) => {
  console.log(req.query);
  var form = fs.readFileSync("./form.html", { encoding: "utf8" });
  res.send(form);
  // res.send({
  //   success: true,
  //   message: "already verify"
  // });
  // const {token} = req.query
  // cosnt rs = jwt.verifyToken(token)
  // res.send({
  //   success:true,
  //   rs:rs
  // })
});

export default Route;

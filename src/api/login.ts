import * as express from "express";
import { User } from "../db/mongo";
const Route: any = express.Router();
const sql: string = "select * from react.login";
interface Req {
  body: any;
}

// body 请求参数类型为 x-www-form-urlencoded
Route.post("/", (req: Req, res: any) => {
  // console.log(req.body)
  const { user, passcode } = req.body;
  const userschema = new User({
    uuid: 12313,
    user: user,
    pass: passcode
  });
  userschema.save((err: any, res: any) => {
    if (err) {
    } else {
    }
  });
  res.send({
    success: true
  });
});

export default Route;

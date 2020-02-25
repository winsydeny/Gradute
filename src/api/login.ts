import * as express from "express";
import Requset from '../d.ts/index'
import { User } from "../db/mongo";
import Jwt from "../jwt";
const jwt = new Jwt();
const Route: any = express.Router();
// body 请求参数类型为 x-www-form-urlencoded（不支持form-data）
Route.post("/", (req: Requset, res: any) => {
  // console.log(req.body)
  const token = jwt.generateToken();
  const {user,passcode} = req.body;
    console.log(user,passcode)

  if(user && passcode){
    res.send({'token':token,'msg':'login success'});
    return false;
  }
  res.send({
    status:0,
    msg:'user and passcode is must be required'
  });
});

export default Route;

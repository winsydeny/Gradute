import * as express from "express";
const Route: any = express.Router();
import { User } from "../db/mongo";
interface Request {
  body: RequestBody;
}
interface RequestBody {
  uid: number;
  hr_id: number;
  email: string;
}
Route.get("/", (req: any, res: any) => {
  User.find({}, (err: any, rs: any) => {
    if (!err) {
      res.send({
        success: true,
        data: rs
      });
    } else {
      res.send("fail");
    }
  });
  // res.send("sd");
});

Route.post("/submit", (req: Request, res: any) => {
  const { uid, hr_id, email } = req.body;
  res.send({data:req.body})
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

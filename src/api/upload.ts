import * as express from "express";
import Jwt from "../jwt";
const Route: any = express.Router();
const jwt = new Jwt();

Route.get("/", (req: any, res: any) => {
  const rs = req.body;
  console.log(rs);
  res.send({
    success: true,
    token: jwt.generateToken()
  });
});
Route.post("/test", (req: any, res: any) => {
  // console.log("=> /api/upload/test");
  const { token } = req.body;
  const rs = jwt.verifyToken(token);
  res.send({
    success: true,
    rs: rs
  });
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
  console.log(result);
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

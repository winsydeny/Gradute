import * as express from "express";
const Route: any = express.Router();

Route.get("/", (req: any, res: any) => {
  const rs = req.body;
  console.log(rs);
  res.send("upload");
});

export default Route;

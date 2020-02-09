import * as express from "express";
const Route: any = express.Router();
const sql: string = "select * from react.login";

Route.get("/", (req: any, res: any) => {
  res.send({
    status: 404,
    success: true,
    message: "Your path is not found!"
  });
});

export default Route;

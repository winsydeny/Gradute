import express from "express";
import bodyParser from "body-parser";
import Console from "./src/middleware/conole";
import verify from "./src/middleware/verify";
// import login from "./src/api/login";
import Mongo from "./src/db/config";
// import register from "./src/api/register";
// import job from "./src/api/job";
// import upload from "./src/api/upload";
import NotFound from "./src/404";
// import search from "./src/api/search";
// import add from "./src/api/add";
// import feedback from "./src/api/feedback";
// import { login, register, job, upload, search, add, feedback } from "./src/api";
import * as ApiList from "./src/api";
import * as fs from "fs";
// for(let item in ApiList){
//   app.use(`/api/${item}`,ApiList[item])
// }
/**
 *  Common Response
 * {
 *    status: Number, 0, 10009,20000,20001
 *    msg: String,
 * }
 *
 *  status:
 *   0 =>  success,
 *   10009 => 无此用户或者账号密码错误
 *   20000 =>
 *   20001 =>
 */
const List: any = ApiList;
console.log("s");
const app = express();
app.use(Console);
// body-parser 并不支持form-data格式
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(verify);
for (let item in List) {
  app.use(`/api/${item}`, List[item]);
}
app.get("/files", (req: any, res: any) => {
  console.log(req.query);
  var form = fs.readFileSync("./form.html", { encoding: "utf8" });
  res.send(form);
});
app.use("*", NotFound);
// app.use("/api/login", login);
// app.use("/api/register", register);
// app.use("/api/job", job);
// app.use("/api/upload", upload);
// app.use("/api/search", search);
// app.use("/api/add", add);
// app.use("/api/feedback", feedback);
// connect mongo
// Mongo().on("error", () => console.log("数据库启动失败"));
// Mongo().once("open", () => {
//   console.log("\x1B[35m", "DataBase has been connected!");
// });
app.listen(3000, function() {
  console.log("\x1b[91m", "Server is running 3000");
});

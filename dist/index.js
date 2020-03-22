"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const conole_1 = __importDefault(require("./src/middleware/conole"));
const verify_1 = __importDefault(require("./src/middleware/verify"));
// import register from "./src/api/register";
// import job from "./src/api/job";
// import upload from "./src/api/upload";
const _404_1 = __importDefault(require("./src/404"));
// import search from "./src/api/search";
// import add from "./src/api/add";
// import feedback from "./src/api/feedback";
// import { login, register, job, upload, search, add, feedback } from "./src/api";
const ApiList = __importStar(require("./src/api"));
const fs = __importStar(require("fs"));
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
const List = ApiList;
console.log("s");
const app = express_1.default();
app.use(conole_1.default);
// body-parser 并不支持form-data格式
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(verify_1.default);
for (let item in List) {
    app.use(`/api/${item}`, List[item]);
}
app.get("/files", (req, res) => {
    console.log(req.query);
    var form = fs.readFileSync("./form.html", { encoding: "utf8" });
    res.send(form);
});
app.use("*", _404_1.default);
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
app.listen(3000, function () {
    console.log("\x1b[91m", "Server is running 3000");
});

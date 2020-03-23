"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mysql = __importStar(require("mysql"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_1 = __importDefault(require("../jwt"));
const mysql_1 = __importDefault(require("../db/mysql"));
const utlis_1 = require("../utlis");
const Route = express.Router();
const jwt = new jwt_1.default();
// control file store
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    },
    filename: (req, file, cb) => {
        const filename = crypto_1.default.createHash("md5");
        filename.update(new Date().getTime().toString(), "utf8");
        let type = file.originalname.split(".");
        cb(null, `${filename.digest("hex")}.${type[type.length - 1]}`);
    }
});
const upload = multer_1.default({ storage: storage });
// upload avatar
Route.post("/", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("=> /api/upload/test");
    console.log(req.get("access_token"));
    // if (req.get("access_token") !== undefined) {
    //   token = req.get("access_token");
    //   const USERINFO: any = jwt.verifyToken(token);
    //   sql = `update find_user_info set online_resume='${req.files[0].path}' where email='${USERINFO.email}'`;
    // } else {
    const token = req.query.token;
    console.log("upload => avatar", token);
    const USERINFO = jwt.verifyToken(token);
    const sql = `update find_users set avatar='${req.files[0].path}' where email='${USERINFO.email}'`;
    // }
    const con = mysql.createConnection(mysql_1.default);
    try {
        // const rs = await _query(con, sql);
        res.send({
            status: 0,
            msg: "upload success",
            url: req.files[0].path
        });
    }
    catch (e) {
        res.send({
            status: -1,
            msg: "fail"
        });
    }
}));
//upload resume
Route.post("/attach", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    console.log("access_token", token);
    console.log("req.files", req.files);
    // if (req.files.length > 0) {
    //   res.send("<h1>Upload success</h1>");
    // } else {
    //   res.send("Fail");
    // }
    try {
        const USERINFO = jwt.verifyToken(token);
        const sql = `update find_user_info set online_resume='${req.files[0].path}' where email='${USERINFO.email}'`;
        const con = mysql.createConnection(mysql_1.default);
        console.log("attach => ", USERINFO);
        yield utlis_1._query(con, sql);
        res.send({
            status: 0,
            msg: "resume upload success",
            url: req.files[0].path
        });
    }
    catch (e) {
        res.send({
            status: -1,
            msg: "fail"
        });
    }
}));
// upload page
Route.get("/files", (req, res) => {
    console.log(req.query);
    var form = fs_1.default.readFileSync("./form.html", { encoding: "utf8" });
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
exports.default = Route;

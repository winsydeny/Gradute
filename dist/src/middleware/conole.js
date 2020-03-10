"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = (req, res, next) => {
    console.log("-----------------------------");
    const log = `${req.ip} : ${req.method} => ${req.path}`;
    console.log("\x1B[32m", `${req.ip} : ${req.method} => ${req.path}`);
    fs_1.default.appendFileSync("log.txt", dateFtt("yyyy-MM-dd hh:mm:ss", new Date()) + " =>" + log + "\n");
    next();
};
function dateFtt(fmt, date) {
    //author: meizz
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
}

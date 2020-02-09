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
const nodemailer_1 = __importDefault(require("nodemailer"));
const Route = express.Router();
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: "1395854149@qq.com",
        pass: "bkjoxojumulyibbf"
    }
});
Route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let responseMessage = "";
    const regCode = 109833;
    const emailMessage = {
        from: '"Find " <1395854149@qq.com>',
        to: "sydenny@126.com",
        subject: "Register ✔",
        text: "Hello world?",
        html: `<div>Your code is: <h3>${regCode}</h3></div>`
    };
    const info = yield transporter.sendMail(emailMessage);
    if (info) {
        responseMessage = "发送成功";
    }
    else {
        responseMessage = "发送失败";
    }
    res.send({
        success: true,
        data: responseMessage
    });
}));
exports.default = Route;

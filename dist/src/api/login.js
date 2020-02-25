"use strict";
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
const jwt_1 = __importDefault(require("../jwt"));
const jwt = new jwt_1.default();
const Route = express.Router();
// body 请求参数类型为 x-www-form-urlencoded（不支持form-data）
Route.post("/", (req, res) => {
    // console.log(req.body)
    const token = jwt.generateToken();
    const { user, passcode } = req.body;
    console.log(user, passcode);
    if (user && passcode) {
        res.send({ 'token': token, 'msg': 'login success' });
        return false;
    }
    res.send({
        status: 0,
        msg: 'user and passcode is must be required'
    });
});
exports.default = Route;

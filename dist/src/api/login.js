"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mongo_1 = require("../db/mongo");
const Route = express.Router();
const sql = "select * from react.login";
// body 请求参数类型为 x-www-form-urlencoded
Route.post("/", (req, res) => {
    // console.log(req.body)
    const { user, passcode } = req.body;
    const userschema = new mongo_1.User({
        uuid: 12313,
        user: user,
        pass: passcode
    });
    userschema.save((err, res) => {
        if (err) {
        }
        else {
        }
    });
    res.send({
        success: true
    });
});
exports.default = Route;

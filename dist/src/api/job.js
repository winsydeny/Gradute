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
const Route = express.Router();
const mongo_1 = require("../db/mongo");
Route.get("/", (req, res) => {
    mongo_1.User.find({}, (err, rs) => {
        if (!err) {
            res.send({
                success: true,
                data: rs
            });
        }
        else {
            res.send("fail");
        }
    });
    // res.send("sd");
});
Route.post("/submit", (req, res) => {
    const { uid, hr_id, email } = req.body;
    res.send({ data: req.body });
    // res.send({
    //   success: true,
    //   data: [
    //     {
    //       uid: uid,
    //       hr_id: hr_id,
    //       email: email
    //     }
    //   ]
    // });
});
exports.default = Route;

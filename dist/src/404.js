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
const sql = "select * from react.login";
Route.get("/", (req, res) => {
    res.send({
        status: 404,
        success: true,
        message: "Your path is not found!"
    });
});
exports.default = Route;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongo = () => {
    const db = mongoose_1.default.connection;
    mongoose_1.default.connect("mongodb://localhost/find");
    // db.on("error", console.error.bind(console, "connection error"));
    // db.once("open", () => {
    //   console.log("\x1B[35m", "DataBase has been connected!");
    // });
    return db;
};
exports.default = connectMongo;

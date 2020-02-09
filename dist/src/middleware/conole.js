"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    console.log("-----------------------------");
    console.log("\x1B[32m", `${req.method} => ${req.path}`);
    next();
};

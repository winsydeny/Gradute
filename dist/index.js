"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const conole_1 = __importDefault(require("./src/middleware/conole"));
const verify_1 = __importDefault(require("./src/middleware/verify"));
const login_1 = __importDefault(require("./src/api/login"));
const config_1 = __importDefault(require("./src/db/config"));
const register_1 = __importDefault(require("./src/api/register"));
const job_1 = __importDefault(require("./src/api/job"));
const upload_1 = __importDefault(require("./src/api/upload"));
const _404_1 = __importDefault(require("./src/404"));
const app = express_1.default();
app.use(conole_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(verify_1.default);
app.use("/api/login", login_1.default);
app.use("/api/register", register_1.default);
app.use("/api/job", job_1.default);
app.use("/api/upload", upload_1.default);
app.use("*", _404_1.default);
// connect mongo
config_1.default().once("open", () => {
    console.log("\x1B[35m", "DataBase has been connected!");
});
app.listen(3000, function () {
    console.log("\x1b[91m", "Server is running 3000");
});

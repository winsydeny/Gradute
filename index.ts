import express from "express";
import bodyParser from "body-parser";
import Console from "./src/middleware/conole";
import verify from "./src/middleware/verify";
import login from "./src/api/login";
import Mongo from "./src/db/config";
import register from "./src/api/register";
import job from "./src/api/job";
import upload from "./src/api/upload";
import NotFound from "./src/404";

const app = express();
app.use(Console);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(verify);
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/job", job);
app.use("/api/upload", upload);
app.use("*", NotFound);
// connect mongo

Mongo().once("open", () => {
  console.log("\x1B[35m", "DataBase has been connected!");
});
app.listen(3000, function() {
  console.log("\x1b[91m", "Server is running 3000");
});

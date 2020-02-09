import mongoose from "mongoose";
const connectMongo = () => {
  const db = mongoose.connection;
  mongoose.connect("mongodb://localhost/find");
  // db.on("error", console.error.bind(console, "connection error"));
  // db.once("open", () => {
  //   console.log("\x1B[35m", "DataBase has been connected!");
  // });
  return db;
};

export default connectMongo;

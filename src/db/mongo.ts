import mongoose from "mongoose";
import mongodb from "mongodb";
const Schema = mongoose.Schema;

const UserSchema: any = new Schema({
  uuid: Number,
  user: String,
  code: String
});

const User: any = mongoose.model("User", UserSchema);
export { User };

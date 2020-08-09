import jwt from "jsonwebtoken";
const cert = "FBsckdislkkklsiaow1343";
export default class Jsonwebtoken {
  generateToken(email: string) {
    const token = jwt.sign({ email: email }, cert, {
      expiresIn: "10h"
    });
    return token;
  }
  verifyToken(token: string) {
    const result = jwt.verify(token, cert);
    return result;
  }
}

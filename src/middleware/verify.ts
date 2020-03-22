import Jwt from "../jwt";
const jwt = new Jwt();
export default (req: any, res: any, next: any) => {
  // 改为header 传输
  const token = req.query.token || req.body.token;
  if (
    req.path === "/api/login" ||
    req.path === "/api/register/send" ||
    req.path === "/api/register" ||
    req.path === "/api/register/personal"
  ) {
    next();
    return false;
  }
  try {
    jwt.verifyToken(token);
    next();
  } catch (e) {
    res.send({
      status: -1,
      success: false,
      message: "The Token is woring!!!",
      error: e
    });
  }
};

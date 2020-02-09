import Jwt from "../jwt";
const jwt = new Jwt();

export default (req: any, res: any, next: any) => {
  const { token } = req.query;
  try {
    const result = jwt.verifyToken(token);
    next(result);
  } catch (e) {
    res.send({
      success: false,
      message: "The Token is woring!",
      error: e
    });
  }
};

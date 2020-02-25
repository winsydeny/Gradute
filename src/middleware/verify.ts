import Jwt from "../jwt";
const jwt = new Jwt();

export default (req: any, res: any, next: any) => {
  const token  =  req.query.token || req.body.token ;
  if(req.path === '/api/login'){
    next();
    return ;
  }
  try {
    jwt.verifyToken(token);
    next();
  } catch (e) {
    res.send({
      success: false,
      message: "The Token is woring!",
      error: e
    });
  }
};

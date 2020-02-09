export default (req: any, res: any, next: any) => {
  console.log("-----------------------------");
  console.log("\x1B[32m", `${req.method} => ${req.path}`);
  next();
};

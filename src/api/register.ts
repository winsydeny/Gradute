import * as express from "express";
import nodeMailer from "nodemailer";
const Route = express.Router();

const transporter = nodeMailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true,
  auth: {
    user: "1395854149@qq.com",
    pass: "bkjoxojumulyibbf"
  }
});
Route.get("/", async (req: any, res: any) => {
  let responseMessage = "";
  const regCode = 109833;
  const emailMessage = {
    from: '"Find " <1395854149@qq.com>', // sender address
    to: "sydenny@126.com", // list of receivers
    subject: "Register ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>Your code is: <h3>${regCode}</h3></div>`
  };
  const info = await transporter.sendMail(emailMessage);
  if (info) {
    responseMessage = "发送成功";
  } else {
    responseMessage = "发送失败";
  }
  res.send({
    success: true,
    data: responseMessage
  });
});
export default Route;

import nodemailer from "nodemailer";
async function main() {
  //创建一个smtp服务
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, // smtp用户名
      pass: testAccount.pass //密码
    }
  });
  //定义邮件内容并发送
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // 发送者
    to: "bar@example.com, baz@example.com", // 接受者
    subject: "Hello", // 标题
    text: "Hello world",
    html: "<b>Hello world?</b>" // 内容，可以是html
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
main().catch(console.error);

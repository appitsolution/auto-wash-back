// const { exec } = require("child_process");
const payment = async (req, res) => {
  // const cmd = "python ./src/service/user/pay/paymentLiqpay.py";
  // exec(cmd, { encoding: "utf8" }, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     res.send(`exec error: ${error}`);
  //     return;
  //   }
  //   res.status(200).send(stdout);
  // });
  // return;
  console.log(req.query);
  console.log(req.params);
  return res.send("test");
};

export default payment;

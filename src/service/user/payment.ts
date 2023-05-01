import OrderPayment from "../../db/SchemaOrder";
import User from "../../db/SchemaUser";
const { spawn } = require("child_process");

const payment = async (req, res) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  if (req.query.order === undefined) {
    return res.status(400).send("Not enough arguments");
  }

  try {
    const payment_id = req.query.order;

    const orderPayment = await OrderPayment.findOne({ orderId: payment_id });
    if (orderPayment === undefined || orderPayment === null) {
      return res.status(404).send("Not Found");
    }
    if (orderPayment.status === "success") {
      return res.status(404).send("Not Found");
    }

    const python_script = "src/service/user/pay/paymentLiqpay.py";

    const python_process = spawn("python3", [python_script, payment_id]);

    python_process.stdout.on("data", async (data) => {
      const dataString = await data.toString();
      console.log(dataString);
      // const replace1 = dataString.replaceAll("'", '"');
      // const replace2 = JSON.stringify(replace1);
      const replace3 = await JSON.parse(dataString);
      const replace4 = replace3.replaceAll("False", "false");
      const replace5 = replace4.replaceAll("True", "true");
      const result = JSON.parse(replace5);

      const user = await User.findOne({ phone: orderPayment.number });

      const checkWashBalance = user.balanceWash.find(
        (item) => item.id === orderPayment.washId
      );

      console.log(checkWashBalance);

      if (checkWashBalance === undefined) {
        await User.findByIdAndUpdate(user._id, {
          balanceWash: [
            ...user.balanceWash,
            {
              id: orderPayment.washId,
              address: orderPayment.addressWash,
              balance: String(result.amount),
            },
          ],
          historyPayment: [
            ...user.historyPayment,
            {
              title: orderPayment.titleWash,
              address: orderPayment.addressWash,
              balance: result.amount,
              date: `${day}.${month}.${year}`,
            },
          ],
        });
      } else {
        await User.findByIdAndUpdate(user._id, {
          balanceWash: [
            ...user.balanceWash.filter(({ id }) => id !== checkWashBalance.id),
            {
              ...checkWashBalance,
              balance: String(
                Number(checkWashBalance.balance) + Number(result.amount)
              ),
            },
          ],
          historyPayment: [
            ...user.historyPayment,
            {
              title: orderPayment.titleWash,
              address: orderPayment.addressWash,
              balance: result.amount,
              date: `${day}.${month}.${year}`,
            },
          ],
        });
      }

      await OrderPayment.findByIdAndUpdate(orderPayment._id, {
        status: "success",
      });

      res.status(200).send(result);
    });

    python_process.stderr.on("data", (data) => {
      console.error(`exec error: ${data}`);
      res.status(500).send(`exec error: ${data}`);
    });
  } catch {
    return res.status(500).send("Error");
  }
};

export default payment;

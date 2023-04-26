import CheckCode from "../../db/SchemaCheckCode";
const accountSid = "AC071ffe4a6ff6a158f415d2c089f1da18";
const authToken = "a6108b26137d1f65855deaeb46430586";
const TWILIO_NUMBER = "+16074247204";

const client = require("twilio")(accountSid, authToken);

const checkCode = async (req: any, res: any) => {
  const { number } = req.body;

  if (!number) return res.status(400).send("Not enough arguments");

  try {
    const code = Math.floor(Math.random() * 9000) + 1000;

    const numberCodes = await CheckCode.findOne({ number: number });

    if (!numberCodes) {
      await CheckCode.create({
        number: number,
        code: String(code),
      });
      client.messages
        .create({
          body: `Ваш код ${String(code)}`,
          from: TWILIO_NUMBER,
          to: number,
        })
        .then((message) => {
          return res.status(200).send("Code Send");
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).send("Error");
        });
    } else {
      await CheckCode.findByIdAndUpdate(numberCodes._id, {
        code: String(code),
      });
      return res.status(200).send("Code Send");
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

export default checkCode;

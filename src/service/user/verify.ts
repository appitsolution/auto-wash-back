import User from "../../db/SchemaUser";
import jwt from "jsonwebtoken";

const verify = async (req: any, res: any) => {
  console.log("ok");
  const { token } = req.body;

  if (!token) return res.status(400).send("Not enough arguments");

  try {
    const { phone } = await jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findOne({ phone: phone });

    if (!user) return res.status(404).send("Not Found");

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

export default verify;

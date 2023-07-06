// import axios from "axios";
const axios = require("axios");
require("dotenv").config();

const encoded = () => {
  const clientId = process.env.SMS_CLIENT_ID;
  const clientSecret = process.env.SMS_CLIENT_SECRET;

  const authString = `${clientId}:${clientSecret}`;
  const encodedAuthString = btoa(authString);

  return encodedAuthString;
};

const sendSMS = async (phone: string, text: string) => {
  try {
    const token = await axios.post(
      `https://api-gateway.kyivstar.ua/idp/oauth2/token`,
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: `Basic ${encoded()}`,
        },
      }
    );

    const requestSendSMS = await axios.post(
      "https://api-gateway.kyivstar.ua/sandbox/rest/v1beta/sms",
      {
        from: "messagedesk",
        to: phone,
        text: text,
      },
      { headers: { Authorization: `Bearer ${token.data.access_token}` } }
    );
    console.log(requestSendSMS.data);
  } catch (err) {
    console.log(err.response);
  }
};

export default sendSMS;

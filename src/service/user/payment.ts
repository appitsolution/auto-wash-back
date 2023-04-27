const payment = (req, res) => {
  console.log(req);
  console.log(req.body);
  res.status(200).send("ok");
};

export default payment;

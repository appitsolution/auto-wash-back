const payment = async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  console.log(req.headers);
  res.status(200).send("ok");
};

export default payment;

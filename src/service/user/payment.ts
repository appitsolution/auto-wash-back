const payment = async (req, res) => {
  console.log(res);
  console.log(req.params);
  console.log(req.quary);
  console.log(req.body);
  res.status(200).send("ok");
};

export default payment;

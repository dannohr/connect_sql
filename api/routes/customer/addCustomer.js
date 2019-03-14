const db = require("../../models/index");

module.exports = app => {
  app.post("/api/addCustomer", (req, res, next) => {
    console.log("attempting to add customer");
    console.log(req.body);

    db.Customer.create({
      CustomerName: req.body.CustomerName,
      Balance: req.body.Balance,
      Active: req.body.Active
    })
      .then(result => res.status(200).send(result))
      .catch(err => res.send(err));
  });
};

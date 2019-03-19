const db = require("../../models/index");

module.exports = app => {
  app.post("/api/addCustomer", (req, res, next) => {
    console.log("attempting to add customer");
    console.log(req.body);

    db.Customer.create({
      qbId: req.body.qbId,
      CustomerName: req.body.CustomerName,
      Balance: req.body.Balance,
      Active: req.body.Active,
      SyncToken: req.body.SyncToken
    })
      .then(result => res.status(200).send(result))
      .catch(err => res.send(err));
  });
};

const db = require("../../models/index");

module.exports = app => {
  app.post("/api/addData", (req, res, next) => {
    console.log("------- addData.js -------");
    console.log("|   attempting to add data to ", req.body.table);
    console.log("|   ", req.body);
    console.log("--------------------------");

    let tableName = req.body.table;
    let body = req.body.body;

    db[tableName]
      .create(body)
      .then(result => res.status(200).send(result))
      .catch(err => res.send(err));
  });
};

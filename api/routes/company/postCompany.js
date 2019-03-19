//CREATE A COMPANY
router.post("/", (req, res) => {
  console.log(req.body);
  db.Company.create(req.body)
    .then(company => res.json(company))
    .catch(err => {
      res.status(500).send({
        text: "There was a problem adding the information to the database.",
        errMsg: err
      });
    });
});

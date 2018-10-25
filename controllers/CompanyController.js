var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = require("../models/index");

// RETURNS ALL THE COMPANIES IN THE DATABASE
router.get("/", function(req, res) {
  db.Company.findAll().then(companies => res.json(companies));
});

// RETURN COMPANY BY ID
router.get("/:id?", (req, res) => {
  let query;
  if (req.params.id) {
    query = db.Company.findById(req.params.id);
  } else {
    query = db.Company.findAll();
  }
  return query.then(companies => {
    companies ? res.json(companies) : res.status(404).send("No company found.");
  });
});

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

// DELETES A COMPANY FROM THE DATABASE
router.delete("/:id", function(req, res) {
  console.log(req.params);
  db.Company.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.status(200).send("Company Deleted"))
    .catch(err => {
      res
        .status(500)
        .send("There was a problem deleting information from the database.");
    });
});

module.exports = router;

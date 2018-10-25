var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = require("../models/index");

// GETS ALL USERS & COMPANIES
router.get("/", function(req, res) {
  db.User.findAll({
    include: [{ model: db.Company }]
  })
    .then(usercompany => {
      res.json(usercompany);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// GETS ONE USER AND ALL COMPANIES FOR USER
router.get("/:id", function(req, res) {
  let query;
  if (req.params.id) {
    query = db.User.findById(req.params.id, {
      include: [{ model: db.Company }]
    });
  } else {
    query = db.User.findAll({
      include: [{ model: db.Company }]
    });
  }
  return query.then(users => {
    users ? res.json(users) : res.status(404).send("No user found.");
  });
});

//CREATE A USER
router.post("/", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name) {
    return res.status(500).send("Missing username, password or name");
  }
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      res
        .status(500)
        .send("There was a problem adding the information to the database.");
    });
});

// DELETES A USER FROM THE DATABASE
router.delete("/:id", function(req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.statucompanyd("ID Deleted"))
    .catch(err => {
      company;
      res
        .status(500)
        .send("There was a problem deleting information from the database.");
    });
});

// // UPDATE A SINGLE USER IN THE DATABASE
router.put("/:id", function(req, res, next) {
  User.update({ name: req.body.name }, { where: { id: req.params.id } }).then(
    function(result) {
      User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => {
          res
            .status(500)
            .send("There was a problem editing information from the database.");
        });
    }
  );
});

module.exports = router;

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = require("../models/index");
const getUser = require("./common/getUser");

// // RETURNS ALL THE USERS IN THE DATABASE
// router.get("/", function(req, res) {
//   getUser(req, res);
// });

// // GET ONE USER
// router.get("/:userid", function(req, res) {
//   db.User.findById(req.params.userid).then(company => {
//     company ? res.json(company) : res.status(404).send("No user found.");
//   });
// });

//CREATE A USER
router.post("/", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name) {
    return res.status(500).send("Missssssing username, password or name");
  }
  db.User.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send("There was a problem adding the information to the database.");
    });
});

// DELETES A USER FROM THE DATABASE
router.delete("/:id", function(req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.send("ID Deleted"))
    .catch(err => {
      company;
      res
        .status(500)
        .send("There was a problem deleting information from the database.");
    });
});

// // UPDATE A SINGLE USER IN THE DATABASE
router.put("/:id", function(req, res, next) {
  db.User.update(
    { name: req.body.name },
    { where: { id: req.params.id } }
  ).then(function() {
    db.User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => {
        res
          .status(500)
          .send("There was a problem editing information from the database.");
      });
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const db = require("../models/index");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config/config");
var VerifyToken = require("./VerifyToken");

router.post("/register", function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  db.User.create({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword
  })
    .then(user => {
      // create a token
      var token = jwt.sign({ id: user.id }, config.jwt_secret, {
        // expiresIn: 86400 // expires in 24 hours
        expiresIn: 3600
      });

      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      return res.status(500).send("There was a problem registering the user.");
    });
});

router.get("/me", VerifyToken, function(req, res, next) {
  db.User.findById(req.userId, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  })
    .then(user => {
      if (!user) return res.status(404).send("No user found.");
      res.json(user);
    })
    .catch(err => {
      res.status(500).send("There was a problem finding the user.");
    });
});

router.post("/login", function(req, res) {
  console.log(req.body.username);
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })

    // findOne({})
    .then(user => {
      console.log(user);
      if (!user) return res.status(404).send("No user found.");

      // console.log(user);
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      console.log(passwordIsValid);

      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      var token = jwt.sign({ id: user._id }, config.jwt_secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      return res.status(500).send("Error on the server.");
    });
});
module.exports = router;

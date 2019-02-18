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

var tokenExpiresIn = 3600; //3600 =  1 hour, 86400 = 24 hours

router.post("/register", function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // First check and see if username already exists
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      console.log(user);
      // Create new user
      if (!user) {
        db.User.create({
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword
        })
          .then(user => {
            // create a token
            var token = jwt.sign({ id: user.id }, config.jwt_secret, {
              expiresIn: tokenExpiresIn
            });
            res.status(200).send({ auth: true, token: token });
          })
          .catch(err => {
            return res
              .status(500)
              .send("There was a problem registering the user.");
          });
      } else {
        // Username already exists
        return res.status(200).send({
          auth: false,
          token: null,
          error: "Username already exists."
        });
      }
    })
    .catch(err => {
      res.status(500).send("There was a problem finding the user.");
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
  db.User.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },

    include: [
      {
        model: db.Company,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        through: {
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      }
    ],

    where: {
      username: req.body.username
    }
  })

    .then(user => {
      if (!user) return res.status(404).send("No user found.");

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null, user: null });
      }

      var token = jwt.sign({ id: user._id }, config.jwt_secret, {
        expiresIn: tokenExpiresIn
      });

      var currentUser = user.dataValues;
      delete currentUser.password;

      // db.UserCompany.findAll({
      //   where: { userId: currentUser.id }
      // }).then(usercompany => {
      //   console.log(usercompany.dataValues);
      res
        .status(200)
        .send({ auth: true, token: token, currentUser: currentUser });
      //   });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Error on the server.", error: err });
    });
});

module.exports = router;

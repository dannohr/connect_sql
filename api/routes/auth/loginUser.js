import jwt from "jsonwebtoken";
import passport from "passport";
import jwtSecret from "../../config/jwtConfig";

const db = require("../../models/index");
var tokenExpiresIn = 3600; //3600 =  1 hour, 86400 = 24 hours

module.exports = app => {
  app.post("/loginUser", (req, res, next) => {
    passport.authenticate("login", (err, users, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        if (info.message === "bad username") {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      } else {
        req.logIn(users, () => {
          db.User.findOne({
            include: [
              {
                model: db.UserCompany,
                // required: true, // <-- JOIN to only return User where there is a matching UserCompany
                include: [
                  {
                    model: db.Company
                  }
                ]
              }
            ],
            where: {
              username: req.body.username
            }
          }).then(user => {
            const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
              expiresIn: tokenExpiresIn
            });

            res.status(200).send({
              isAuthenticated: true,
              token,
              message: "user found & logged in",
              company: user.UserCompanies
            });
          });
        });
      }
    })(req, res, next);
  });
};

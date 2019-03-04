import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/companies", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username) {
        db.Company.findAll().then(company => {
          if (company != null) {
            console.log("companies found in db from getCompany");
            console.log(company);
            res.status(200).send({
              isAuthenticated: true,
              message: "all companies in db",
              allCompanies: company
            });
          } else {
            console.error("no companies exist");
            res.status(401).send("no companies exists in db");
          }
        });
      } else {
        console.error("jwt id and username do not match");
        res.status(403).send("username and jwt token do not match");
      }
    })(req, res, next);
  });
};

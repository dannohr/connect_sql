import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/company", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username) {
        console.log(req.query.id);
        db.Company.findOne({
          where: {
            id: req.query.companyId
          }
        }).then(companyInfo => {
          if (companyInfo != null) {
            console.log("company found in db from getCompany");
            console.log(companyInfo.dataValues);
            res.status(200).send({
              isAuthenticated: true,
              message: "one company in db",
              companyInfo: companyInfo
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

// router.get("/:id", (req, res) => {
//   console.log("looking for id:", req.params.id);
//   let query;
//   if (req.params.id) {
//     query = db.Company.findById(req.params.id);
//   } else {
//     query = db.Company.findAll();
//   }
//   return query.then(companies => {
//     companies ? res.json(companies) : res.status(404).send("No company found.");
//   });
// });

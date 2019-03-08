import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/me", (req, res, next) => {
    let companyId = req.query.companyId;

    console.log("--------------------------------");
    console.log(req.params);
    console.log(req.query);
    console.log("company id is ", companyId);
    console.log("--------------------------------");

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username) {
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
            username: user.username
          }
        }).then(user => {
          if (user != null) {
            console.log("user found in db from findUsers");
            console.log(user.username);
            res.status(200).send({
              isAuthenticated: true,
              username: user.username,
              message: "user found & logged in",
              company: user.UserCompanies,
              companyId: companyId
            });
          } else {
            console.error("no user exists in db with that username");
            res.status(401).send("no user exists in db with that username");
          }
        });
      } else {
        console.error("jwt id and username do not match");
        res.status(403).send("username and jwt token do not match");
      }
    })(req, res, next);
  });
};

import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/me", (req, res, next) => {
    console.log("--------------------------------");
    console.log(req.params);
    console.log(req.query);
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
              include: [
                {
                  model: db.Company,
                  where: {
                    id: req.query.companyId
                  }
                }
              ]
            }
          ],
          where: {
            username: user.username
          }
        }).then(userInfo => {
          if (userInfo != null) {
            console.log("user found in db from findUsers");
            // console.log(userInfo);
            res.status(200).send({
              isAuthenticated: true,
              first_name: userInfo.first_name,
              last_name: userInfo.last_name,
              email: userInfo.email,
              username: userInfo.username,
              message: "user found in db",
              companyName: userInfo.UserCompanies[0].Company.name
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

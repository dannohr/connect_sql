import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/users", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username) {
        db.User.findAll({
          attributes: [
            ["id", "userId"],
            "username",
            "firstName",
            "lastName",
            "email"
          ],
          include: [
            {
              model: db.UserCompany,
              // required: true, // <-- JOIN to only return User where there is a matching UserCompany
              include: [
                {
                  model: db.Company
                },
                {
                  model: db.UserRole,
                  include: [
                    {
                      model: db.UserRight,
                      through: {
                        attributes: []
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }).then(userInfo => {
          if (userInfo != null) {
            console.log("user found in db from findUsers");
            console.log(userInfo.dataValues);
            res.status(200).send({
              isAuthenticated: true,
              message: "all users in db",
              allUsers: userInfo
            });
          } else {
            console.error("no users exist");
            res.status(401).send("no users exists in db");
          }
        });
      } else {
        console.error("jwt id and username do not match");
        res.status(403).send("username and jwt token do not match");
      }
    })(req, res, next);
  });
};

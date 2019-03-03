import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/user", (req, res, next) => {
    // console.log(req.query);

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      console.log("-----");
      console.log(req.query.userId);
      console.log(parseInt(req.query.userId));
      console.log("-----");
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
        // }
        // else if (req.query.id != parseInt(req.params.id)) {
        //   res.status(200).send({
        //     isAuthenticated: true,
        //     message: "not a valid userId",
        //     newUser: true
        //   });
      } else if (user.username) {
        console.log(req.query.id);
        db.User.findOne({
          // attributes: [["id", "userId"], "username", "name", "email"],
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
          ],
          where: {
            id: req.query.userId
          }
        }).then(userInfo => {
          if (userInfo != null) {
            console.log("user found in db from getUser");
            console.log(userInfo.dataValues);
            res.status(200).send({
              isAuthenticated: true,
              message: "one user in db",
              userInfo: userInfo
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

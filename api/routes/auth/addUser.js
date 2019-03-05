import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.post("/addUser", (req, res, next) => {
    console.log("attempting to add user");
    console.log(req.body);

    passport.authenticate("register", (err, user, info) => {
      console.log("Beginning", user);
      if (err) {
        console.log("here is the error");
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        //no error, so new user was registered.  Now add them to a company
        db.UserCompany.findOrCreate({
          where: { UserId: user.dataValues.id },
          defaults: { CompanyId: req.body.companyId }
        }).spread((user, created) => {
          console.log(
            user.get({
              plain: true
            })
          );
          console.log(created);
        });

        res
          .status(200)
          .send({ message: "user created", userInfo: user.dataValues });
      }
    })(req, res, next);
  });
};

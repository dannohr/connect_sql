import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.delete("/deleteUser", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        db.User.destroy({
          where: {
            id: req.query.userId
          }
        })
          .then(userInfo => {
            if (userInfo === 1) {
              console.log("user deleted from db", userInfo);
              res
                .status(200)
                .send({ message: "user deleted from db", success: true });
            } else {
              console.error("user not found in db");
              res
                .status(404)
                .send({
                  message: "no user with that userID to delete",
                  success: true
                });
            }
          })
          .catch(error => {
            console.error("problem communicating with db");
            res.status(500).send(error);
          });
      }
    })(req, res, next);
  });
};

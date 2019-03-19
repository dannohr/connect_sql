import passport from "passport";
const db = require("../../models/index");

module.exports = app => {
  app.get("/api/customer", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (user) {
        console.log("user");
        return res.send(user);
      }
      // return items even if no authentication is present, instead of 401 response
      else console.log(err);
      return res.send(user);
    })(req, res, next);

    //   passport.authenticate("jwt", { session: false }, (err, user, info) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     if (info !== undefined) {
    //       console.log(info.message);
    //       res.status(401).send(info.message);
    //     } else if (user.username) {
    //       db.Customer.findAll().then(customer => {
    //         if (customer != null) {
    //           console.log("companies found in db from getCompany");
    //           console.log(customer);
    //           res.status(200).send({
    //             isAuthenticated: true,
    //             message: "all Customers in db",
    //             customer: customer
    //           });
    //         } else {
    //           console.error("no companies exist");
    //           res.status(401).send("no companies exists in db");
    //         }
    //       });
    //     } else {
    //       console.error("jwt id and username do not match");
    //       res.status(403).send("username and jwt token do not match");
    //     }
    //   })(req, res, next);
  });
};

// console.log("------------------------------");
// console.log(" err is:");
// console.log(err);
// console.log(" user is:");
// console.log(user);
// console.log(" info is:");
// console.log(info);
// console.log("------------------------------");

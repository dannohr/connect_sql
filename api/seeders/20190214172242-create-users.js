"use strict";
var bcrypt = require("bcryptjs");
// var hashedPassword = bcrypt.hashSync(req.body.password, 8);

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "User",
      [
        {
          firstName: "Mr.",
          lastName: "Admin",
          username: "admin",
          password: bcrypt.hashSync("password", 8),
          email: "admin@admin.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Mr.",
          lastName: "User",
          username: "user",
          password: bcrypt.hashSync("password", 8),
          email: "user@user.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Dan",
          lastName: "Nohr",
          username: "dan",
          password: bcrypt.hashSync("password", 8),
          email: "danielnohr@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("User", null, {});
  }
};

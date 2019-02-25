"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "UserRoleRight",
      [
        {
          userRoleId: "1",
          userRightId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userRoleId: "1",
          userRightId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userRoleId: "1",
          userRightId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userRoleId: "2",
          userRightId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("UserRoleRight", null, {});
  }
};

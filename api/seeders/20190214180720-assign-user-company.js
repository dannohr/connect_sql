"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "UserCompany",
      [
        {
          userId: "1",
          companyId: "1",
          userRoleId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "1",
          companyId: "2",
          userRoleId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "2",
          companyId: "2",
          userRoleId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("UserCompany", null, {});
  }
};

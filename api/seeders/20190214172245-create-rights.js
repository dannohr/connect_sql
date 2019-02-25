"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      "UserRight",
      [
        {
          rightName: "View 1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          rightName: "View 2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          rightName: "View 3",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete("UserRight", null, {});
  }
};

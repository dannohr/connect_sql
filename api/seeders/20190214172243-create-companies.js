"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkInsert(
      "Company",
      [
        {
          name: "Company One",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Company Two",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Company Three",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkDelete("Company", null, {});
  }
};

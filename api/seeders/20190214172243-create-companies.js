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
          name: "Sandbox Company_US_1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sandbox Company_US_2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sandbox Company_US_3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sandbox Company_US_4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sandbox Company_US_5",
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

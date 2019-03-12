"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Session",

      {
        sid: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        expires: {
          type: Sequelize.DATE
        },
        data: {
          type: Sequelize.TEXT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        indexes: [
          {
            name: "expires_index",
            method: "BTREE",
            fields: ["expires"]
          },
          {
            name: "createdAt_index",
            method: "BTREE",
            fields: ["createdAt"]
          },
          {
            name: "updatedAt_index",
            method: "BTREE",
            fields: ["updatedAt"]
          }
        ]
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Session");
  }
};

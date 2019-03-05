"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define(
    "UserCompany",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      userRoleId: { type: DataTypes.INTEGER, allowNull: true }
    },
    {}
  );

  UserCompany.associate = function(models) {
    UserCompany.belongsTo(models.User, {});
    UserCompany.belongsTo(models.Company, {});
    UserCompany.belongsTo(models.UserRole, {});
  };

  return UserCompany;
};

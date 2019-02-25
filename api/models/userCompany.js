"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define(
    "UserCompany",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER
      },
      userRoleId: DataTypes.INTEGER
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

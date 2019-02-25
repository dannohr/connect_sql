"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER
      },
      roleName: DataTypes.STRING
    },
    {}
  );

  UserRole.associate = function(models) {
    UserRole.hasMany(models.UserCompany, {});
    UserRole.belongsToMany(models.UserRight, {
      through: models.UserRoleRight
    });
  };

  return UserRole;
};

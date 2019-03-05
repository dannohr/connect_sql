"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRoleRight = sequelize.define(
    "UserRoleRight",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      userRoleId: DataTypes.INTEGER,
      userRightId: DataTypes.INTEGER
    },
    {}
  );

  UserRoleRight.associate = function(models) {
    UserRoleRight.belongsTo(models.UserRole, {});
    UserRoleRight.belongsTo(models.UserRight, {});
  };

  return UserRoleRight;
};

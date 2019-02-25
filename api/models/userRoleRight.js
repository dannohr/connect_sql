"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRoleRight = sequelize.define(
    "UserRoleRight",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER
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

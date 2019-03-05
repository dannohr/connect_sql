"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRight = sequelize.define(
    "UserRight",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      rightName: DataTypes.STRING
    },
    {}
  );

  UserRight.associate = function(models) {
    UserRight.belongsToMany(models.UserRole, {
      through: models.UserRoleRight
    });
  };

  return UserRight;
};

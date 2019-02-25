"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRight = sequelize.define(
    "UserRight",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER
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

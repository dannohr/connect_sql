"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
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

  Role.associate = function(models) {
    Role.hasMany(models.UserCompany, {
      foreignKey: "id"
    });
  };
  return Role;
};

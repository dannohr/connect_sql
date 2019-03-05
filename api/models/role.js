"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
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

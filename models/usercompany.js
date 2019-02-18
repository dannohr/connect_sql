"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define(
    "UserCompany",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      roleId: DataTypes.INTEGER
      // companyId: DataTypes.INTEGER,
      // userId: DataTypes.INTEGER
    },
    {}
  );

  UserCompany.associate = function(models) {
    UserCompany.hasMany(models.Company, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    UserCompany.hasMany(models.User, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    UserCompany.hasOne(models.Role, {
      foreignKey: "id"
    });
  };

  return UserCompany;
};

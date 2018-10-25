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
      }
    },
    {}
  );
  // UserCompany.associate = function(models) {
  //   UserCompany.hasMany(models.Company, {
  //     foreignKey: "companyId",
  //     onDelete: "CASCADE"
  //   });
  //   UserCompany.hasMany(models.User, {
  //     foreignKey: "userId",
  //     onDelete: "CASCADE"
  //   });
  // };
  return UserCompany;
};

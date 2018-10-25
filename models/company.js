"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING
    },
    {}
  );
  Company.associate = function(models) {
    Company.belongsToMany(models.User, {
      through: models.UserCompany,
      foreignKey: "companyId",
      onDelete: "CASCADE"
    });
  };
  return Company;
};

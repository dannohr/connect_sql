"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      email: DataTypes.STRING,
      password: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.belongsToMany(models.Company, {
      through: models.UserCompany,
      foreignKey: "userId"
    });
  };
  return User;
};

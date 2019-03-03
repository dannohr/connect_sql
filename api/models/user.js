"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER
      },
      email: DataTypes.STRING,
      password: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE
    },
    {}
  );

  User.associate = models => {
    User.hasMany(models.UserCompany, {});
  };

  return User;
};

module.exports = {
  development: {
    username: "user",
    password: "password",
    database: "app",
    host: "dbserver",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true
    },
    define: {
      freezeTableName: true
    },
    operatorsAliases: false,
    // seederStorageTableName: "SequelizeData",
    seederStorage: "sequelize"
    // seederStorage: "json",
    // logging: console.log
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    use_env_variable: "DATABASE_URL"
  },
  jwt_secret: "mysecretcode"
};

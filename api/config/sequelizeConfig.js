module.exports = {
  development: {
    username: "sa",
    password: "Password1",
    database: "rentalApp",
    host: "192.168.2.50",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true,
      options: {
        requestTimeout: 60000,
        port: 1433
      }
    },
    define: {
      freezeTableName: true
    },
    // operatorsAliases: false,
    // seederStorageTableName: "SequelizeData",
    seederStorage: "sequelize",
    // seederStorage: "json",
    logging: false
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
  }
};

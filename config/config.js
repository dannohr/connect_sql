module.exports = {
  development: {
    username: "sql",
    password: "sql",
    database: "db",
    host: "192.168.2.50",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true
    },
    define: {
      freezeTableName: true
    }
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

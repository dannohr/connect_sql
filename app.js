var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var UserController = require("./controllers/UserController");
app.use("/users", UserController);

var CompanyController = require("./controllers/CompanyController");
app.use("/company", CompanyController);

var UserCompanyController = require("./controllers/UserCompanyController");
app.use("/usercompany", UserCompanyController);

var AuthController = require("./controllers/AuthController");
app.use("/auth", AuthController);

module.exports = app;

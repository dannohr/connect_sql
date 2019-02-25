import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;

require("config/passportConfig");

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

app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

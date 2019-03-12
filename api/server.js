import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import sessionManagement from "./modules/sessionManagement";

const app = express();
const port = process.env.PORT || 3001;

require("./config/passportConfig");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use(sessionManagement);

// var UserController = require("./routes/UserController");
var CompanyController = require("./routes/CompanyController");
var UserCompanyController = require("./routes/UserCompanyController");
// var AuthController = require("./routes/jwtLogin/AuthController");

// app.use("/users", UserController);
app.use("/company", CompanyController);
app.use("/usercompany", UserCompanyController);
// app.use("/auth", AuthController);

require("./routes/auth/loginUser")(app);
require("./routes/auth/findUsers")(app);
require("./routes/auth/updatePassword")(app);
require("./routes/auth/addUser")(app);

require("./routes/user/getUsers")(app);
require("./routes/user/getUser")(app);
require("./routes/user/deleteUser")(app);

require("./routes/company/getCompanies")(app);
require("./routes/company/getCompany")(app);

require("./routes/qb/getQuickbooksUri")(app);
require("./routes/qb/getQuickbooksCallback")(app);
require("./routes/qb/getQuickbooksRevoke")(app);
require("./routes/qb/getQuickbooksRefresh")(app);

require("./routes/qb/company/getCompany")(app);
require("./routes/qb/postQBquery")(app);

// Connect To QuickBooks
// This call will redirect to Intuit's authorization flow
// var QBAuthController = require("./qb/routes/connect_to_quickbooks");
// app.use("/api/qbauth", QBAuthController);

// Callback - called via redirect_uri after authorization
// app.use("/callback", require("./qb/routes/callback"));

// Call an example API over OAuth2
// app.use("/api_call", require("./qb/routes/api_call.js"));

app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

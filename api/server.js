import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import sessionManagement from "./config/sessionManagement";

const app = express();
const port = process.env.PORT || 3001;

require("./config/passportConfig");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(sessionManagement);

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

require("./routes/customer/getCustomer")(app);
require("./routes/customer/addCustomer")(app);

require("./routes/universal/addData")(app);

app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

// app.use("/users", UserController);
// app.use("/company", CompanyController);
// app.use("/usercompany", UserCompanyController);
// app.use("/auth", AuthController);

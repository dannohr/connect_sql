import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";

const app = express();
const port = process.env.PORT || 3001;

require("./config/passportConfig");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

var UserController = require("./routes/UserController");
app.use("/users", UserController);

var CompanyController = require("./routes/CompanyController");
app.use("/company", CompanyController);

var UserCompanyController = require("./routes/UserCompanyController");
app.use("/usercompany", UserCompanyController);

var AuthController = require("./routes/jwtLogin/AuthController");
app.use("/auth", AuthController);

require("./routes/loginUser")(app);
require("./routes/findUsers")(app);

app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

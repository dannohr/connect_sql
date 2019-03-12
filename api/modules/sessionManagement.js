import session from "express-session";
import db from "../models/index";

var SequelizeStore = require("connect-session-sequelize")(session.Store);

var mySessionStore = new SequelizeStore({
  db: db.sequelize
});

module.exports = session({
  secret: "make a guess",
  store: mySessionStore,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true, // if you do SSL outside of node.
  saveUninitialized: "false"
});

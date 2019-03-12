var tools = require("../util/QBtools");
import axios from "axios";

module.exports = app => {
  app.get("/api/qb/revoke", (req, res, next) => {
    let token = tools.getToken(req.session);
    if (!token) return res.json({ error: "Not authorized" });

    let url = tools.revoke_uri;
    let postConfig = {
      headers: {
        Authorization: "Basic " + tools.basicAuth,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let body = {
      token: token.accessToken
    };

    console.log("Sending revoke to ", url);
    console.log(tools.basicAuth), console.log(token.accessToken);

    axios
      .post(url, body, postConfig)
      .then(response => {
        console.log(response.data);
        tools.clearToken(req.session);
        res.send({ response: "Revoke successful" });
      })
      .catch(err => {
        console.log(err);
        // return res.send({ error: err, statusCode: err.statusCode });
      });
  });
};

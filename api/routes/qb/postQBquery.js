import tools from "../util/QBtools";
import config from "../../config/QBconfig.json";
import axios from "axios";

module.exports = app => {
  app.post("/api/qb/query", (req, res, next) => {
    let tokenObject = tools.getToken(req.session);
    if (!tokenObject) return res.json({ error: "Not authorized" });
    let token = "Bearer " + tokenObject.data.access_token;

    if (!req.session.realmId)
      return res.json({
        error:
          "No realm ID.  QBO calls only work if the accounting scope was passed!"
      });

    // var token = tools.getToken(req.session);
    // if (!token) return res.json({ error: "Not authorized" });
    // if (!req.session.realmId)
    //   return res.json({
    //     error:
    //       "No realm ID.  QBO calls only work if the accounting scope was passed!"
    //   });

    // Set up API call (with OAuth2 accessToken)
    let url = config.api_uri + req.session.realmId + "/query/";
    let body = req.body.body;
    let postConfig = {
      headers: {
        Authorization: token,
        "User-Agent": "test",
        Accept: "application/json",
        "Content-Type": "application/text"
      }
    };

    axios
      .post(url, body, postConfig)
      .then(response => {
        // Check if 401 response was returned - refresh tokens if so!
        // tools
        //   .checkForUnauthorized(req, requestObj, err, response)
        //   .then(function({ err, response }) {
        //     if (err || response.statusCode != 200) {
        //       return res.json({ error: err, statusCode: response.statusCode });
        //     }
        //   });

        // API Call was a success!
        res.status(200).send(response.data);
      })
      .catch(err => {
        res.status(401).send("error");
      });
  });
};

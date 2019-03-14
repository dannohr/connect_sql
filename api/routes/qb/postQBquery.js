import tools from "../util/QBtools";
import config from "../../config/QBconfig.json";
import axios from "axios";

module.exports = app => {
  app.post("/api/qb/query", (req, res, next) => {
    // Check for token will return res.status(401) if there is no token.
    // If there is a token, retrun the valud auth headers
    let authHeaders = tools.checkForToken(req, res, next);

    //If there's a valid token, make the api call:
    console.log("authHeaders");
    console.log(authHeaders.headers);

    if (authHeaders.headers) {
      let url = config.api_uri + req.session.realmId + "/query/";
      let body = req.body.body;
      // let postConfig = {
      //   headers: {
      //     Authorization: "Bearer " + token.accessToken,
      //     "User-Agent": "my trial app",
      //     Accept: "application/json",
      //     "Content-Type": "application/text"
      //   }
      // };

      axios
        .post(url, body, authHeaders)
        .then(response => {
          // Check if 401 response was returned - refresh tokens if so!
          // tools
          //   .checkForUnauthorized(req, requestObj, err, response)
          //   .then(function({ err, response }) {
          //     if (err || response.statusCode != 200) {
          //       return res.json({ error: err, statusCode: response.statusCode });
          //     }
          //   });
          res.status(200).send(response.data);
        })
        .catch(err => {
          res.status(401).send("error");
        });
    }
  });
};

import tools from "../../util/QBtools";
import config from "../../../config/QBconfig.json";
import axios from "axios";

module.exports = app => {
  app.get("/api/qb/company", (req, res, next) => {
    // Check for token will return res.status(401) if there is no token.
    // If there is a token, return the valud auth headers
    let authHeaders = tools.checkForToken(req, res, next);

    // Set up API call (with OAuth2 accessToken)
    if (authHeaders.headers) {
      let url =
        config.api_uri +
        req.session.realmId +
        "/companyinfo/" +
        req.session.realmId;

      axios
        .get(url, authHeaders)
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
          console.log(err);
          res.status(401).send({ error: err });
        });
    }
  });
};

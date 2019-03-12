var tools = require("../../util/QBtools");
var config = require("../../../config/QBconfig.json");
var request = require("request");

module.exports = app => {
  app.get("/api/qb/company", (req, res, next) => {
    var token = tools.getToken(req.session);
    if (!token) return res.json({ error: "Not authorized" });
    if (!req.session.realmId)
      return res.json({
        error:
          "No realm ID.  QBO calls only work if the accounting scope was passed!"
      });

    // Set up API call (with OAuth2 accessToken)
    var url =
      config.api_uri +
      req.session.realmId +
      "/companyinfo/" +
      req.session.realmId;
    console.log("Making API call to: " + url);
    var requestObj = {
      url: url,
      headers: {
        Authorization: "Bearer " + token.accessToken,
        Accept: "application/json"
      }
    };

    // Make API call
    request(requestObj, function(err, response) {
      // Check if 401 response was returned - refresh tokens if so!
      tools.checkForUnauthorized(req, requestObj, err, response).then(
        function({ err, response }) {
          if (err || response.statusCode != 200) {
            return res.json({ error: err, statusCode: response.statusCode });
          }

          // API Call was a success!
          //   console.log("--- Company info ---");
          //   console.log(response.body);
          //   console.log("--- Company info ---");
          res.json(JSON.parse(response.body));
        },
        function(err) {
          console.log(err);
          return res.json(err);
        }
      );
    });
  });
};
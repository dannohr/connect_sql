var tools = require("../util/QBtools");

module.exports = app => {
  app.get("/api/qb/revoke", (req, res, next) => {
    /** /api_call/revoke **/

    var token = tools.getToken(req.session);
    if (!token) return res.json({ error: "Not authorized" });

    var url = tools.revoke_uri;
    request(
      {
        url: url,
        method: "POST",
        headers: {
          Authorization: "Basic " + tools.basicAuth,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token.accessToken
        })
      },
      function(err, response, body) {
        if (err || response.statusCode != 200) {
          return res.json({ error: err, statusCode: response.statusCode });
        }
        tools.clearToken(req.session);
        res.json({ response: "Revoke successful" });
      }
    );
  });
};

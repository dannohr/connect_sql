var tools = require("../util/QBtools");

// Note: typical use case would be to refresh the tokens internally (not an API call)
// We recommend refreshing upon receiving a 401 Unauthorized response from Intuit.
// A working example of this can be seen above: `/api/qbrefresh`

module.exports = app => {
  app.get("/api/qb/refresh", (req, res, next) => {
    var token = tools.getToken(req.session);
    if (!token) return res.json({ error: "Not authorized" });

    tools.refreshTokens(req.session).then(
      function(newToken) {
        // We have new tokens!
        res.json({
          accessToken: newToken.accessToken,
          refreshToken: newToken.refreshToken
        });
      },
      function(err) {
        // Did we try to call refresh on an old token?
        console.log(err);
        res.json(err);
      }
    );
  });
};

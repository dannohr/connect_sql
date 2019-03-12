var tools = require("../util/QBtools");

module.exports = app => {
  app.get("/api/qb/auth", (req, res, next) => {
    /** /connect_to_quickbooks **/
    console.log("Connecting to Quickbooks");
    // Set the Accounting + Payment scopes
    tools.setScopes("connect_to_quickbooks");

    // Constructs the authorization URI.
    var uri = tools.intuitAuth.code.getUri({
      // Add CSRF protection
      state: tools.generateAntiForgery(req.session)
    });

    // Redirect
    console.log("Redirecting to authorization uri: " + uri);
    res.status(200).send(uri);
  });
};

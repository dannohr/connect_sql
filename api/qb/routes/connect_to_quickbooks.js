var tools = require("../tools/tools.js");
var express = require("express");
var router = express.Router();

/** /connect_to_quickbooks **/
router.get("/", function(req, res) {
  console.log("test");
  // Set the Accounting + Payment scopes
  tools.setScopes("connect_to_quickbooks");

  // Constructs the authorization URI.
  var uri = tools.intuitAuth.code.getUri({
    // Add CSRF protection
    state: tools.generateAntiForgery(req.session)
  });

  // Redirect
  console.log("Redirecting to authorization uri: " + uri);
  // res.redirect(uri);
  res.status(200).send(uri);
  // res.json({redirectURI: "/upload"})
});

module.exports = router;

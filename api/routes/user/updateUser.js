// // UPDATE A SINGLE USER IN THE DATABASE
router.put("/:id", function(req, res, next) {
  db.User.update(
    { name: req.body.name },
    { where: { id: req.params.id } }
  ).then(function() {
    db.User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => {
        res
          .status(500)
          .send("There was a problem editing information from the database.");
      });
  });
});

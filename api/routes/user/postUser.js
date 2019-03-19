//CREATE A USER
router.post("/", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name) {
    return res.status(500).send("Missssssing username, password or name");
  }
  db.User.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send("There was a problem adding the information to the database.");
    });
});

// DELETES A COMPANY FROM THE DATABASE
router.delete("/:id", function(req, res) {
  console.log(req.params);
  db.Company.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.status(200).send("Company Deleted"))
    .catch(err => {
      res
        .status(500)
        .send("There was a problem deleting information from the database.");
    });
});

const db = require("../models");

// Defining methods for the UserController
module.exports = {

  //Creates a new user when signup is clicked
  create: function(req, res) {
    console.log("==========================");
    console.log(req);
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};

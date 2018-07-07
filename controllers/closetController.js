const db = require("../models");

// Defining methods for the closetController
module.exports = {

  findAll: function(req, res) {
    db.Closet.find( 
      {} // TODO: use req.body instead? do I need body parser for that?
    )
    .then(x => res.json(x))
    .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Closet.create(
      {
      user: "Jim",
      articleName: "shirt",
      clothingType: "top",
      color: "red",
      material: "silk"
      }
    )
      .then(x => res.json(x))
      .catch(err => res.status(422).json(err));
  }
};

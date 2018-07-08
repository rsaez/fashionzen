const db = require("../models");

// Defining methods for the closetController
module.exports = {

  findAll: function(req, res) {
    db.Closet.find(req.body)
    .then(x => res.json(x))
    .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Closet.create(req.body)
      .then(x => res.json(x))
      .catch(err => res.status(422).json(err));
  }
};

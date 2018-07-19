const db = require("../models");

// Defining methods for the closetController
module.exports = {

  findAll: function(req, res) {

    console.log("========================");
    console.log(req.params.id);

    db.Closet
    .find({ user: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Closet.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.Closet
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

const db = require("../models");

// Defining methods for the closetController
module.exports = {

  findAll: function(req, res) {
    db.Closet.find(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {

   // pull image out of req.body

   // process the image data

   // combine image with req.body and save it to a var called proccessed


    db.Closet.create(req.body) // replace with variable called proccessed
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

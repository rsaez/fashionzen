const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const closetSchema = new Schema({
  user: { type: String, required: true },
  articleName: {type: String, required: true },
  clothingType: { type: String, required: true },
  color: { type: String, required: true },
  material: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Closet = mongoose.model("Closet", closetSchema);

module.exports = Closet;

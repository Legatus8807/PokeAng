const mongoose = require('mongoose');

const pokeSchema = mongoose.Schema({
  name: {type:String},
  dexNum: {type: Number},
  type1: {type: String},
  type2: {type: String},
  hp: {type: Number},
  atk: {type: Number},
  def: {type: Number},
  spA: {type: Number},
  spD: {type: Number},
  spe: {type: Number}
});

module.exports = mongoose.model('Pokemon', pokeSchema);

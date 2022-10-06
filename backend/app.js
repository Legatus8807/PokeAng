const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon');
const cors = require('cors');
const bodyparser = require('body-parser');
const { db } = require('./models/pokemon');
const pokemon = require('./models/pokemon');
var corsOptions = {
  //origin: "http://localhost:5500"
  origin: "http://localhost:4200"
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


mongoose.connect('mongodb+srv://SpenceW:scw1988.@cluster0.abdevda.mongodb.net/PokeAng_Database')
  .then(() => {
    console.log('connected to database');
  }).catch(() => {
    console.log('Did not connect to database');
  });

app.get('/pokemon', (req, res, next) => {
  Pokemon.find({}).then(pokemon => {res.status(200).json({pokemon})});
});

app.post("/pokemon", (req, res, next) => {
  const poke = new Pokemon({
    name: req.body.name,
    dexNum: req.body.dexNum,
    type1: req.body.type1,
    type2: req.body.type2,
    hp: req.body.hp,
    atk: req.body.atk,
    def: req.body.def,
    spA: req.body.spA,
    spD: req.body.spD,
    spe: req.body.spe
  });
  poke.save().then(createdPoke => {
    res.status(201).json({
      message: "Pokemon added",
      pokeId: createdPoke._id
    });
  });
});

app.put("/pokemon/:id", (req, res, next) => {
  Pokemon.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    dexNum: req.body.dexNum,
    type1: req.body.type1,
    type2: req.body.type2,
    hp: req.body.hp,
    atk: req.body.atk,
    def: req.body.def,
    spA: req.body.spA,
    spD: req.body.spD,
    spe: req.body.spe
  }).then(result => res.status(200).json({ message: "Update Successful!"}));

})

app.delete("/pokemon/:id", (req, res, next) => {
  Pokemon.findByIdAndDelete(req.params.id).then(result => res.status(200).json({message: "Pokemon Deleted"}));
})

module.exports = app;


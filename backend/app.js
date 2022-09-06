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

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
*/

/* Old One with Message
app.get('/pokemon', (req, res, next) => {
  Pokemon.find()
  .then(
    documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        pokemon: documents
    });
  });
});
*/

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

/*

router.get('/bulbasaur', (req, res, next) => {
  const pokeNameInput1 = 'bulbasaur';
  axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeNameInput1)
    .then((response) => {

      //console.log(response.data.stats)

      const bulba1 = new Pokemons({
        name: (response.data.name[0].toUpperCase() + response.data.name.slice(1)),
        type1: (response.data.types[0].type.name[0].toUpperCase()
          + response.data.types[0].type.name.slice(1)),
        type2: (response.data.types[1].type.name[0].toUpperCase()
          + response.data.types[1].type.name.slice(1)),
        hp: response.data.stats[0].base_stat,
        atk: response.data.stats[1].base_stat,
        def: response.data.stats[2].base_stat,
        spA: response.data.stats[3].base_stat,
        spD: response.data.stats[4].base_stat,
        spe: response.data.stats[5].base_stat

      });

      bulba1.save();

      res.render('bulbasaur.pug', {Pokemons: bulba1});
      //res.redirect('/pokemon/bulbasaur');

    }).catch((error) => {
      console.log(error);
      if(error) {
        res.status(404);
        console.log(error);
        return;
      }
    });
    //res.redirect('/pokemon/bulbasaur');
   // res.location('/pokemon/bulbasaur')
});

*/


const models = require('../models/models');

const covidController = {};

covidController.getCharacters = async (req, res, next) => {
  res.locals.characters = await (models.Global.find({}));
  next();
};

// covidController.getSpecies = async (req, res, next) => {
//   res.locals.species = await (models.Species.findById(req.query.id));
//   // res.locals.species = await (models.Species.find({ _id: `${req.query.id}` }));
//   next();
// }

// covidController.getHomeworld = async (req, res, next) => {
//   res.locals.homeworld = await (models.Planet.findById(req.query.id));
//   next();
// }

// covidController.getFilm = async (req, res, next) => {
//   res.locals.film = await (models.Film.findById(req.query.id));
//   next();
// }

// covidController.addCharacter = async (req, res, next) => {
//   await (models.Person.create(req.body));
//   next();
// }

module.exports = covidController;

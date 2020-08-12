/* eslint-disable function-paren-newline */
const express = require('express');

const covidController = require('../controllers/controller');

const router = express.Router();

router.get('/',
  covidController.getCharacters,
  (req, res) => res.status(200).json([...res.locals.characters]),
);

// router.get('/species',
//   starWarsController.getSpecies,
//   (req, res) => res.status(200).json(res.locals.species),
// );

// router.get('/homeworld',
//   starWarsController.getHomeworld,
//   (req, res) => res.status(200).json(res.locals.homeworld),
// );

// router.get('/film',
//   starWarsController.getFilm,
//   (req, res) => res.status(200).json(res.locals.film),
// );

// router.post('/character',
//   starWarsController.addCharacter,
//   (req, res) => res.sendStatus(200),
// );

module.exports = router;

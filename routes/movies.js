const router = require('express').Router();
let Movies = require('../models/Movies');

router.get('/', async (req, res) => {
  try {
    const movies = await Movies.find();
    res.json(movies);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const movies = req.body.sliceMovies;
    const userId = req.body.userId;
    const username = req.body.username;

    const userCheck = await Movies.findOne({ username: username });

    if (userCheck) {
      return res.status(400).json({ msg: 'Username is already used!' });
    }

    const newMovie = new Movies({
      movies,
      userId,
      username
    });

    const movie = await newMovie.save();
    res.json('movie added' + movie);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

router.get('/:username', async (req, res) => {
  try {
    const movies = await Movies.findOne({ username: req.params.username });
    res.json(movies);
  } catch (error) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

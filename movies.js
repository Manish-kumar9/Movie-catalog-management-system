const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET /api/movies — Fetch all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies', details: err.message });
  }
});

// POST /api/movies — Add a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create movie', details: err.message });
  }
});

// GET /api/movies/:id — Get one movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie', details: err.message });
  }
});

// PUT /api/movies/:id — Update movie details
router.put('/:id', async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Movie not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update movie', details: err.message });
  }
});

// DELETE /api/movies/:id — Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete movie', details: err.message });
  }
});

module.exports = router;
import express from 'express';
import dotenv from 'dotenv';
import { getMovieDetails, getShowDetails, getTrendingMovies, getTrendingTVShows, searchMovie, searchTV } from './tmdbFunctions/index.js';

dotenv.config();

const tmdbRoutes = express.Router();

// GET trending movies from TMDB - Sci-fi
tmdbRoutes.get('/TMDB/trendingmovies', async (req, res) => {
    const { page } = req.query;
    try {
      const sciFiData = await getTrendingMovies(page);
      res.json(sciFiData);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // GET trending movies from TMDB - Sci-fi
  tmdbRoutes.get('/TMDB/trendingtv', async (req, res) => {
    const { page } = req.query;
    try {
      const sciFiData = await getTrendingTVShows(page);
      res.json(sciFiData);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // GET movie details from TMDB
  tmdbRoutes.get('/TMDB/movie', async (req, res) => {
    const { id } = req.query;
    try {
      const data = await getMovieDetails(id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // GET tv show details from TMDB
  tmdbRoutes.get('/TMDB/show', async (req, res) => {
    const { id } = req.query;
    try {
      const data = await getShowDetails(id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // GET search movie from TMDB
  tmdbRoutes.get('/TMDB/searchmovie', async (req, res) => {
    const { page, query } = req.query;
    try {
      const data = await searchMovie(page, query);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });
  
  // GET search tv show from TMDB
  tmdbRoutes.get('/TMDB/searchtv', async (req, res) => {
    const { page, query } = req.query;
    try {
      const data = await searchTV(page, query);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  });


export default tmdbRoutes;

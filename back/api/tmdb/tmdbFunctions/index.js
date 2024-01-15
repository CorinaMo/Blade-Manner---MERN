import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_KEY;
const baseURL = process.env.TMDB_URL;
const scifiQuery = 'with_genres=878|14';
const scifiQueryTV = 'with_genres=10765';
const currentDate = new Date(Date.now());
const msYear = 1000 * 60 * 60 * 24 * 365;
const formattedCurrentDate = currentDate.toISOString().split('T')[0];
const formattedMinDate = (new Date(currentDate - msYear)).toISOString().split('T')[0];
const movieReleaseDates = `primary_release_date.gte=${formattedMinDate}&primary_release_date.lte=${formattedCurrentDate}`;
const showReleaseDates= `air_date.gte=${formattedMinDate}&air_date.lte=${formattedCurrentDate}`;
const searchQueries = `include_adult=true&language=en-US&include_video=true&page=1&watch_region=US&with_watch_providers=8|337|4&sort_by=popularity.desc`;

export async function getTrendingMovies(page) {
  try {
    const response = await axios.get(
      `${baseURL}/discover/movie?${movieReleaseDates}&${searchQueries}&${scifiQuery}&api_key=${TMDB_API_KEY}&page=${page}`
    );

    return {
      results: response?.data?.results ?? {},
      totalPages: response?.data?.total_pages ?? 0,
    };
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    throw new Error('Error fetching trending movies');
  }
};

export async function getTrendingTVShows(page) {
  try {
    const response = await axios.get(
      `${baseURL}/discover/tv?${showReleaseDates}&${searchQueries}&${scifiQueryTV}&api_key=${TMDB_API_KEY}&page=${page}`
    );
    return {
      results: response?.data?.results ?? {},
      totalPages: response?.data?.total_pages ?? 0,
    };
  } catch (error) {
    console.error('Error fetching trending TV shows:', error.message);
    throw new Error('Error fetching trending TV shows');
  }
};

export async function getMovieDetails(id) {
  try {
    const response = await axios.get(
      `${baseURL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images`
    );
    return {
      results: response?.data ?? {},
    };
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw new Error('Error fetching movie details');
  }
};

export async function getShowDetails(id) {
  try {
    const response = await axios.get(
      `${baseURL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images`
    );
    return {
      results: response?.data ?? {},
    };
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw new Error('Error fetching movie details');
  }
};

export async function searchMovie(page, query) {
  try {
    const response = await axios.get(
      `${baseURL}/search/movie?query=${query}&include_adult=true&language=en-US&api_key=${TMDB_API_KEY}&page=${page}`
    );
    const filteredResults = response?.data?.results?.filter(res => res?.genre_ids?.includes(14) || res?.genre_ids?.includes(878));
    return {
      results: filteredResults ?? {},
    };
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw new Error('Error fetching movies: ', error.message);
  }
};

export async function searchTV(page, query) {
  try {
    const response = await axios.get(
      `${baseURL}/search/tv?query=${query}&include_adult=true&language=en-US&api_key=${TMDB_API_KEY}&page=${page}`
    );
    const filteredResults = response?.data?.results?.filter(res => res?.genre_ids?.includes(10765));
    return {
      results: filteredResults ?? {},
    };
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw new Error('Error fetching movies: ', error.message);
  }
};



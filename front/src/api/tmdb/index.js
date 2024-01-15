import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;
const options = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const getTMDB = async (page) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/scifi?page=${page}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};
export const getTMDBTrendingMovies = async (page) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/trendingmovies?page=${page}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};

export const getTMDBTrendingTv = async (page) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/trendingtv?page=${page}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};

export const getTMDBshow = async (id) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/show?id=${id}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};

export const getTMDBmovie = async (id) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/movie?id=${id}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};

export const searchTMDBmovie = async (page, query) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/searchmovie?page=${page}&query=${query}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};

export const searchTMDBtv = async (page, query) => {
    try {
        const response = await axios.get(
            `${apiURL}/TMDB/searchtv?page=${page}&query=${query}`,
            options,
        );
        return response?.data ?? {};
    } catch (error) {
        console.error(error);
    }
};
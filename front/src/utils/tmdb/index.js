
import { getTMDBTrendingMovies, getTMDBTrendingTv } from "../../api/tmdb";

export const callByType = async (type, page) => {
    let response = {};
    switch (type) {
        case 'movie':
            response = await getTMDBTrendingMovies(page);
            break;
        case 'tv':
            response = await getTMDBTrendingTv(page);
            break;
        default:
            break;
    };
    return response;
};
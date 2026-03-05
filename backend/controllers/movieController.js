import { getMoviesData } from '../data/loadData.js';

const toNumber = (value) => {
    if (value === null || value === undefined) {
        return null;
    }

    const parsed = Number.parseFloat(String(value).replace(/[^0-9.]/g, ''));
    return Number.isNaN(parsed) ? null : parsed;
};

const normalizeGenres = (genre) => {
    if (!genre) {
        return [];
    }

    if (Array.isArray(genre)) {
        return genre;
    }

    return String(genre)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
};

const normalizeMovie = (movie) => {
    return {
        id: movie.imdbID || movie.id || movie.Title,
        title: movie.Title || movie.title,
        year: toNumber(movie.Year ?? movie.year),
        rating: toNumber(movie.imdbRating ?? movie.rating),
        runtime: toNumber(movie.Runtime ?? movie.runtime),
        genres: normalizeGenres(movie.Genre ?? movie.genres),
        overview: movie.Plot || movie.overview || '',
        posterUrl: movie.Poster || movie.posterUrl || '',
    };
};

export const getMovies = async (req, res) => {
    const movies = await getMoviesData();
    res.json(movies.map(normalizeMovie));
};

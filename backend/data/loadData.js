import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedMovies = null;
let cachedSeats = null;

const readJson = async (fileName) => {
  const filePath = path.join(__dirname, fileName);
  const data = await readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const getMoviesData = async () => {
  if (!cachedMovies) {
    cachedMovies = await readJson('movie.json');
  }
  return cachedMovies;
};

export const getSeatMapData = async () => {
  if (!cachedSeats) {
    cachedSeats = await readJson('seats.json');
  }
  return cachedSeats;
};

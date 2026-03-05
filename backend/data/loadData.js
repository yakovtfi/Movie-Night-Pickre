import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedMovies = null;
let cachedSeats = null;
let cachePurchase = null;

const readJson = async (fileName) => {
  const filePath = path.join(__dirname, fileName);
  const data = await readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJson = async (fileName, data) => {
  const filePath = path.join(__dirname, fileName);
  const content = JSON.stringify(data, null, 2);
  await writeFile(filePath, content, 'utf-8');
  return data;
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

export const readPurchasesFile = async () => {
  if (!cachePurchase) {
    cachePurchase = await readJson('purchases.json');
  }
  return cachePurchase;
};

export const writePurchasesFile = async (purchases) => {
  const toWrite = purchases ?? cachePurchase;
  if (toWrite == null) {
    throw new Error('No purchases provided to write');
  }
  cachePurchase = toWrite;
  await writeJson('purchases.json', cachePurchase);
  return cachePurchase;
};
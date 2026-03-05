import { getSeatMapData } from '../data/loadData.js';

export const getSeatsForMovie = async (req, res) => {
  const { movieId } = req.params;
  const seatMap = await getSeatMapData();
  res.json(seatMap[movieId] || []);
};

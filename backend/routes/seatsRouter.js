import express from 'express';
import { getSeatsForMovie } from '../controllers/seatsControoller.js';

const router = express.Router();

router.get('/:movieId', getSeatsForMovie);

export default router;

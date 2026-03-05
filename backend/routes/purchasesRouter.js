import express from 'express';
import { postPurchasesSeats, getPurchases } from '../controllers/purchasesController.js';

const router = express.Router();

router.post('/', postPurchasesSeats);
router.get('/', getPurchases);

export default router;

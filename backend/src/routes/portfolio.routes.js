import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getHoldings, getTransactions, buyStock, sellStock } from '../controllers/portfolio.controller.js';


const router = express.Router();
router.use(authMiddleware);
router.get('/holdings', getHoldings);
router.get('/transactions', getTransactions);
router.post('/buy', buyStock);
router.post('/sell', sellStock);
export default router;
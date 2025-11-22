import express from 'express';
import { listStocks, getStock } from '../controllers/stock.controller.js';


const router = express.Router();
router.get('/', listStocks);
router.get('/:id', getStock);
export default router;
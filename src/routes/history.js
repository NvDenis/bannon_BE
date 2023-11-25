import express from 'express'
import HistoryController from '../controllers/history.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express()

router.get('/', verifyToken, HistoryController.getHistory)

export default router;
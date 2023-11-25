import express from 'express'
const router = express.Router();
import OrderRouter from '../controllers/order.js'

router.post('/', OrderRouter.hanldeOrder)

export default router
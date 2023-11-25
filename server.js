dotenv.config();
import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/routes/users.js'
import connectDB from './src/config/connectDB.js';
import cookieParser from 'cookie-parser';
import productRouter from './src/routes/product.js'
import fileRouter from './src/routes/file.js'
import categoryRouter from './src/routes/category.js'
import cors from 'cors'
import {  notFound } from './src/middlewares/errorHandler.js';
import orderRouter from './src/routes/order.js'
import historyRouter from './src/routes/history.js'
const PORT = process.env.PORT || 3001

const app = express();
connectDB();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'));


app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/file', fileRouter);
app.use('/category', categoryRouter)
app.use('/order', orderRouter)
app.use('/history', historyRouter)



app.use(notFound);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port ", PORT);
})


import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderrRoutes.js';

dotenv.config();

mongoose.set('strictQuery', false).connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db');
}).catch(err => {
    console.log(err.message)
})

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});
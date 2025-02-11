import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectMongoDB.js';
import userRouter from './routes/user.route.js';
import uploadRouter from './routes/upload.route.js';
import categoryRouter from './routes/category.route.js';
import SubcategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';
import CartRouter from './routes/cart.route.js';
import AddressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';
dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = 8080 || process.env.PORT;

app.get("/", (req, res) => {
    res.json({
        message : "Server is running " + PORT
    });
});

app.use('/api/user', userRouter);
app.use('/api/file', uploadRouter);
app.use('/api/category', categoryRouter);
app.use('/api/subcategory', SubcategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', CartRouter);
app.use('/api/address', AddressRouter);
app.use('/api/order', orderRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
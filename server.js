import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/users/user.router.js';
import { productRouter } from './routes/products/product.router.js';
import { authRouter } from './routes/auth/auth.router.js';
import { errorHandler } from './shared/errorHandler.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);

try {
    mongoose.connect("mongodb://localhost:27017/express&db-assignment").then(() => {
        console.log("DB is connected!!");
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
}
catch (error) {
    console.log("Error in connecting to DB and server!!")
}
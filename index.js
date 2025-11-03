import express from 'express';
import mongoose from 'mongoose';
import RootRouter from './routes/index.routes.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL) 
    .then(() => {
        console.log("Kết nối DB thành công!")
    })
    .catch((error)=> {
        console.error("Lỗi kết nối DB", error)
    });

app.use('/', RootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}!`);
});
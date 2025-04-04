import express from 'express';
import { PORT } from './config/dotenv.js';
import connectDatabase from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'

const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.send({ message: "Welcome to E-commerce API" });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);


app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`server running on PORT ${PORT}`);
});
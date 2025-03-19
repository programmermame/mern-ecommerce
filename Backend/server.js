import express from 'express';
import { PORT } from './config/dotenv.js';

const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.send({ message: "Welcome to E-commerce API" });
});




app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})
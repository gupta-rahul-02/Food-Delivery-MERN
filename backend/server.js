import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app config
const app = express();
const port = 4000;

//middlewares
app.use(express.json());
app.use(cors());

//Db Connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/images",express.static('uploads'));

app.get("/",(req,res) =>{
    res.send("Hello")
})

app.listen(port,()=>{
    console.log(`Severe Running on http://localhost:${port}`)
})

// mongodb+srv://rahulguptaslg20:Jr2k7BB7OyjuhuE0@cluster0.bjs44kr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
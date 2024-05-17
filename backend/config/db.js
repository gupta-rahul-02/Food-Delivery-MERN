import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://rahulguptaslg20:Jr2k7BB7OyjuhuE0@cluster0.bjs44kr.mongodb.net/Food-Del").then(()=>console.log('Db Connected'))
}
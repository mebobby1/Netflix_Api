import express from "express";
import { config } from "dotenv";
import browserRouter from "./routes/index.js"

config({
    path:"./data/config.env"
})


export const app = express();


app.use("/api/v1",browserRouter)

app.get("/",(req,res)=>{
    res.send("Hello World")
})


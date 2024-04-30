import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import routes from "./routes/Routes.js";
import cors from "cors";

const app=express();

// configure env
dotenv.config();

// database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));

// Routes
app.use("/api",routes);

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running http://localhost:${port}`);
});
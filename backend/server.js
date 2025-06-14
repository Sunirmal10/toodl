import express from 'express';
import taskRouter from './routes/task.route.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();


// 1. port

const port = process.env.PORT || 5000

// 2. create express app

const app = express();

// 3. send GET request to index route

app.get("/", (req, res)=> {
    res.send("Backend running smoothly here!")
});

// 4. mongodb connection

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("MongoDB connected!")
}).catch((err)=> {
    console.log("MongoDB connection error:", err)
});

// 5. middlewares (4)

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors(
    // {
    //   origin: frontend deploy url
    // }
));

// 6. routes

app.use("/", taskRouter);

// 7. error handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

// 8. Start and Running server 

app.listen(port, ()=> {
    console.log("Server running on Port:", port)
});
import express from 'express'
import morgan from 'morgan';
import 'dotenv/config'
import mongoose from 'mongoose';
import authRoutes from './routers/Auth.mjs';
// import cors from "cors"



const app=express();
const PORT= 4000;

app.use(express.json());
app.use(morgan('tiny'))
mongoose.connect(process.env.MONGODBURI).then(()=> console.log("connected to mongodb"))
.catch((error)=>console.log("err=>",error))



function middleware(req,res,next) {
    console.log("middleware",Date.now());
    next();
    
}

app.use(middleware);


// Routes
app.use("/api/auth", authRoutes);

app.get('/',(req, res)=>{
    // console.log("req", req);
    res.send("Server is running")

})
// app.use('/task',taskRoutes);

app.listen(PORT,()=>console.log("Server is running on PORT"+ PORT)
);
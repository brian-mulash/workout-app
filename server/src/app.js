import express from 'express';
import cors from 'cors';
import cookiePaser from 'cookie-parser';

const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookiePaser());

//routes

export default app;
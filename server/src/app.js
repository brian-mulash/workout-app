import express from 'express';
import cors from 'cors';
import cookiePaser from 'cookie-parser';
import routes from './routes/_index.js'

const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookiePaser());

//routes
app.use('/api', routes)

export default app;
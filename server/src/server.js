import http from 'http';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js'

dotenv.config();

const databaseConnection = () => {
    const server = http.createServer(app);
    const port = process.env.PORT || 4500;
    const connectionString = process.env.MONGODB_URI;
    
    mongoose.connect(connectionString)
        .then(() => {
            console.log("mongodb database connection is successful")

            server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))
        })
        .catch((error) => {
            console.error('error while connecting to mongodb:', error);
            process.exit(1);
        })
}

databaseConnection();
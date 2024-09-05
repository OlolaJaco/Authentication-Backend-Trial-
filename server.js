import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/database.js";
import authRoutes from './routes/auth.js';

// configuring dot-env
dotenv.config();

// connect to database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
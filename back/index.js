import express from 'express';
import authRoutes from './api/auth/index.js';
import userListRoutes from './api/list/index.js';
import tmdbRoutes from './api/tmdb/index.js';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

// MKcert SSL configuration
// FOR TESTING PURPOSES
const sslOptions = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

// mongodb
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Connnected');
});

// SERVER
const hostname = 'localhost';// FOR LOCAL TESTING PURPOSES
const port = 8080;
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', //// FOR LOCAL TESTING PURPOSES
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// FOR LOCAL TESTING PURPOSES
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.use(express.json());

app.use(cookieParser());

// AUTH - login & signup
app.use('/auth', authRoutes);

// User List Routes
app.use('/list', userListRoutes);

// TMDB
app.use('/', tmdbRoutes);


const server = https.createServer(sslOptions, app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';
import cors from 'cors';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ExpressGrpahQL = require('express-graphql').graphqlHTTP;
import dotenv from 'dotenv';
import MainSchema from './Schema/MainSchema.js';
import LoginRoute from './Routes/login-route.js';
import RegisterRoute from './Routes/register-route.js';
import CheckJWTRoute from './Routes/check-jwt.js';
import compression from 'compression';
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const io = socket(server);

// Middleware
app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.0.105:3000']
}));
app.use(compression({level: 6}));

// Socket initializations;
io.on('connection', socket => {
    socket.on('join', (id, userID) => {
        socket.join(id);
        socket.broadcast.to(id).emit('client-joined', userID);
    });

    socket.on('leave', (roomID) => {
        
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

// graphql endpoints;
app.use('/graphql', ExpressGrpahQL({
    schema: MainSchema,
    graphiql: true
}));

// api endpoints;
app.use('/login', LoginRoute);
app.use('/signup', RegisterRoute);
app.use('/check-auth', CheckJWTRoute);

// mongoDB connection;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected to mongoDB');

}).catch(() => {
    console.log('Didnot connect to mongoDB');
});

// main listener
server.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`)
});
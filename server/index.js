import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import ipfilter from 'express-ipfilter';

import { pokemonRouter, adminRouter, blacklist } from './routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.set('trust proxy', 1);

app.use((req, res, next) => {
    ipfilter.IpFilter(blacklist, { mode: 'deny' })(req, res, next);
});

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests.',
    validate: { trustProxy: false },
});

app.use('/v1/', limiter);
app.use('/v1', pokemonRouter);

app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon3D API Server Engine.');
});

app.use((err, req, res, next) => {
    if (err.name === 'IpDeniedError') {
        return res.status(403).json({ error: 'Access Denied: Your IP is blacklisted.' });
    }
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server live on port ${port}`);
});
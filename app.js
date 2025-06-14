import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import scraperRoutes from './routes/scraper.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register route
app.use('/scrape', scraperRoutes);

// Base
app.get('/', (req, res) => {
    res.send('WebScraper API is running!');
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

import express from 'express'
import handleScrape from '../controllers/scraperController.js'
const router = express.Router();

router.get('/:category', handleScrape);

export default router;

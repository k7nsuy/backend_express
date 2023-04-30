import express from 'express';
import { home, search } from '../controller/globalController.js';
import { trendingVideo } from '../controller/videoController.js';

const globalRouter = express.Router();

globalRouter.get('/', trendingVideo);
globalRouter.get('/search', search);

export default globalRouter;
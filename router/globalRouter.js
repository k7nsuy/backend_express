import express from 'express';
import { home, search } from '../controller/globalController.js';

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get('/search', search);

export default globalRouter;
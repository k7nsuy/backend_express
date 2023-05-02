import express from 'express';
import { home } from '../controller/videoController.js';

const globalRouter = express.Router();
globalRouter.get('/', home);

export default globalRouter;
import express from 'express';
import { handleHome } from '../controller/globalController.js';

const globalRouter = express.Router();

globalRouter.get('/', handleHome);

export default globalRouter;
import express from 'express';
import { home } from '../controller/videoController.js';
import { getSeeProfile } from '../controller/userController.js';

const globalRouter = express.Router();
globalRouter.get('/', home);
globalRouter.get('/:id([0-9a-f]{24})', getSeeProfile)


export default globalRouter;
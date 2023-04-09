import express from 'express';

export const videoRouter = express.Router();



videoRouter.get('/', handleVideo);

export default videoRouter;
import express from 'express';

export const userRouter = express.Router();



userRouter.get('/', handleUser);

export default userRouter;
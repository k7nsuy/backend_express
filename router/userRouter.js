import express from 'express';
import {joinUser, loginUser, logoutUser, editUser, removeUser, seeUser} from '../controller/userController.js'

export const userRouter = express.Router();

userRouter.get('/join', joinUser);
userRouter.get('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/edit', editUser);
userRouter.get('/remove', removeUser);
userRouter.get('/:id', seeUser);

export default userRouter;
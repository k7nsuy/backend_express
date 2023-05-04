import express from 'express';
import {getCreateUser, getLoginUser, logoutUser, editUser, removeUser, postCreateUser, postLoginUser} from '../controller/userController.js'

export const userRouter = express.Router();

userRouter.route('/join').get(getCreateUser).post(postCreateUser);
userRouter.route('/login').get(getLoginUser).post(postLoginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/edit', editUser);
userRouter.get('/remove', removeUser);

export default userRouter;
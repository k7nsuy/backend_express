import express from 'express';
import {getCreateUser, getLoginUser, getGithubLogin, logoutUser, editUser, removeUser, postCreateUser, postLoginUser, getGithubCallback} from '../controller/userController.js'

export const userRouter = express.Router();

userRouter.route('/join').get(getCreateUser).post(postCreateUser);
userRouter.route('/login').get(getLoginUser).post(postLoginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/edit', editUser);
userRouter.get('/remove', removeUser);
userRouter.get('/github/login', getGithubLogin);
userRouter.get('/github/callback', getGithubCallback);


export default userRouter;
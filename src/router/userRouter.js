import express from 'express';
import {getCreateUser, getLoginUser, getGithubLogin, getLogoutUser, getEditUser, removeUser, postCreateUser, postLoginUser, getGithubCallback, postEditUser} from '../controller/userController.js'
import { protectedMiddleware, publicMiddleware } from '../middleware.js';

export const userRouter = express.Router();

userRouter.route('/join')
    .all(publicMiddleware)
    .get(getCreateUser)
    .post(postCreateUser);
userRouter.route('/login')
    .all(publicMiddleware)
    .get(getLoginUser)
    .post(postLoginUser);   
userRouter.route('/edit')
    .all(protectedMiddleware)
    .get(getEditUser)
    .post(postEditUser);
userRouter.get('/logout', protectedMiddleware, getLogoutUser);
userRouter.get('/remove', removeUser);
userRouter.get('/github/login', publicMiddleware, getGithubLogin);
userRouter.get('/github/callback', publicMiddleware, getGithubCallback);


export default userRouter;
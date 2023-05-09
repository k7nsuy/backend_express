import express from 'express';
import {getCreateUser, getLoginUser, getGithubLogin, getLogoutUser, getEditUser, removeUser, postCreateUser, postLoginUser, getGithubCallback, postEditUser, getEditPassword, postEditPassword, getSeeProfile} from '../controller/userController.js'
import { avatarMiddleware, protectedMiddleware, publicMiddleware } from '../middleware.js';

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
    .post(avatarMiddleware.single('avatar'), postEditUser);
userRouter.route('/edit-password').all(protectedMiddleware).get(getEditPassword).post(postEditPassword);
userRouter.get('/logout', protectedMiddleware, getLogoutUser);
userRouter.get('/remove', removeUser);
userRouter.get('/github/login', publicMiddleware, getGithubLogin);
userRouter.get('/github/callback', publicMiddleware, getGithubCallback);
userRouter.get('/:id', getSeeProfile)


export default userRouter;
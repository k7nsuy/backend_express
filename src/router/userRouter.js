import express from 'express';
import {getCreateUser, getLoginUser, logoutUser, editUser, removeUser, seeUser, postCreateUser} from '../controller/userController.js'

export const userRouter = express.Router();

userRouter.route('/join').get(getCreateUser).post(postCreateUser);
userRouter.get('/login', getLoginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/edit', editUser);
userRouter.get('/remove', removeUser);
userRouter.get('/:id', seeUser);

export default userRouter;
import express from 'express';
import {watchVideo, getEditVideo,postEditVideo, getDeleteVideo, getUploadVideo, postUploadVideo, searchVideo } from '../controller/videoController.js';
import { publicMiddleware } from '../middleware.js';

export const videoRouter = express.Router();

// :id 밑에 /upload를 두면 /upload도 id(parameter)로 인식해버리기 때문에 제일 상단에 둔다.
// 하지만 정규 표현식을 사용하면 어디에 놓든 상관없다.

// 정규 표현식을 사용하여 숫자만 인식하도록 지정 
// d(digit) - 0~9 숫자, + - 어느 자리 숫자 상관 x , (\\d+) - \ 하나 필요하지만 js에선 \\ 두개 필요
// 앞에 :id - id를 붙여준 이유는 해당 req.params.id 와 같이 key 값(id)을 주기 위해
videoRouter.get('/:id([0-9a-f]{24})', watchVideo);
videoRouter.route('/:id([0-9a-f]{24})/edit').get(getEditVideo).post(postEditVideo)
videoRouter.route('/:id([0-9a-f]{24})/delete').get(getDeleteVideo)
videoRouter.route('/upload').get(getUploadVideo).post(postUploadVideo)
videoRouter.get('/search', searchVideo);



export default videoRouter;
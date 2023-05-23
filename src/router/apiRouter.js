import express from "express";
import { createComment, registerView } from "../controller/videoController.js";
import { deleteComment } from "../controller/userController.js";

const apiRouter = express.Router();

apiRouter.post('/videos/:id([0-9a-f]{24})/view', registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.get("/comments/:id([0-9a-f]{24})/deleteComment", deleteComment);

export default apiRouter;
import express from 'express';
import postController from '../controllers/post.controllers.js';
import postMiddleware from '../middlewares/post.middlewares.js';

const PostRouter = express.Router();

PostRouter.post('/',postMiddleware.newPost ,postController.newPost);

export default PostRouter;
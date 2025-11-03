import express from 'express';
import UserRouter from './user.routes.js';
import PostRouter from './post.routes.js';
import userMiddleware from '../middlewares/user.middlewares.js';

const RootRouter = express.Router();

RootRouter.use('/users', UserRouter);
RootRouter.use('/posts', userMiddleware.login, PostRouter);

export default RootRouter;
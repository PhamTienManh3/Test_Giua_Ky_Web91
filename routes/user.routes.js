import express from 'express';
import userMiddleware from '../middlewares/user.middlewares.js';
import userController from '../controllers/user.controllers.js';

const UserRouter = express.Router();
UserRouter.post('/register', userMiddleware.createNewUser, userController.createNewUser);
UserRouter.post('/login',userMiddleware.login ,userController.login);
export default UserRouter;
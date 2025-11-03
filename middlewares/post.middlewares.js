import PostModel from "../models/post.models.js";
import UserModel from "../models/user.models.js";

const postMiddleware = {
    newPost : async (req, res, next) => {
        try {
            const { userId, content } = req.body;
            const { apiKey } = req.query;

            if (!userId || !content) throw new Error ("userId and content are required!");

            const userIdPost = await UserModel.findOne({_id: userId});
            if (!userIdPost) throw new Error ("User not found!");
            if (userIdPost.apiKey !== apiKey) throw new Error ("Invalid or expired apiKey!");
            return next();
        } catch (error) {
            res.status(400).send({
                data: null,
                message: error.message,
                success: false
            }) ; 
        }
    },

    updatePost: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { apiKey } = req.query;
            const { content } = req.body;

            if (!content) throw new Error ("content is required!");
            const post = await PostModel.findById(id);
            if (!post) throw new Error ("Post not found!");

            const userId = post.userId;
            const userPost = await UserModel.findById(userId);
            if (apiKey !== userPost.apiKey) throw new Error ("Invalid or expired apiKey!");
            return next();
        } catch (error) {
            res.status(400).send({
                data: null,
                message: error.message,
                success: false
            });   
        }
    }
};

export default postMiddleware;
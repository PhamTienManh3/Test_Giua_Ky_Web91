import PostModel from '../models/post.models.js';

const postController = {
    newPost: async (req, res) => {
        try {
            const { userId, content } = req.body;
            const newPost = await PostModel.create({
                userId: userId,
                content: content
            });
            res.status(201).send({
                data: newPost,
                message: "Post created successfully!",
                success: true
            });  
        } catch (error) {
            res.status(400).send({
                data: null,
                message: error.message,
                success: false
            }); 
        }
    },

    updatePost: async ( req, res ) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const post = await PostModel.findById(id);
            if (!post) throw new Error("Post not found!");

            post.content = content;
            await post.save();
            res.status(200).send({
                data: post,
                message: "Update successfully!",
                success: true
            });
        } catch (error) {
            res.status(400).send({
                data: null,
                message: error.message,
                success: false
            });  
        }
    }
};

export default postController;
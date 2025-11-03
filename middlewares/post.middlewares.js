const postMiddleware = {
    newPost : (req, res, next) => {
        try {
            const { userId, content } = req.body;
            if (!userId || !content) throw new Error ("")
            return next();
        } catch (error) {
            
        }
    }
};

export default postMiddleware;
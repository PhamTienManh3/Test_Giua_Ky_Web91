import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";

const userMiddleware = {
  createNewUser: async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName) throw new Error("userName is required!");
      if (!email) throw new Error("email is required!");
      if (!password) throw new Error("password is required!");

      const existedEmail = await UserModel.findOne({ email: email });
      if (existedEmail) throw new Error("Email already exists!");
      return next();
    } catch (error) {
      res.status(400).send({
        data: null,
        message: error.message,
        success: false,
      });
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error ("Email and password are required!");

      const currentUser = await UserModel.findOne({ email: email });
      if (!currentUser) throw new Error("Invalid email or password!");

      const comparePassword = await bcrypt.compare(
        password,
        currentUser.passwordHash
      );
      if (!comparePassword) throw new Error("Invalid email or password!");
      return next();
    } catch (error) {
      res.status(401).send({
        data: null,
        message: error.message,
        success: false
      });
    }
  },
};

export default userMiddleware;

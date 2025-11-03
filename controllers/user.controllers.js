import UserModel from "../models/user.models.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userController = {

  createNewUser: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await UserModel.create({
        userName: userName,
        email: email,
        passwordHash: passwordHash
      });
      res.status(201).send({
        data: newUser,
        message: "Created successfully!",
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

  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email: email });
      const randomString = crypto.randomUUID();
      const apiKey = `mern-$${user._id}$-$${email}$-$${randomString}$`;
      user.apiKey =  apiKey;
      await user.save();
      res.status(200).send({
        data: apiKey,
        message: 'Login successful!',
        success: true
      });
    } catch (error) {
      res.status(401).send({
        data: null,
        message: error.message,
        success: false
      })
    }
  }

};

export default userController;

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RegisterValidationCheck from '../Middleware/register-auth-middleware.js';
import RegistrationModel from '../Model/RegistrationModel.js';
dotenv.config();

const router = express.Router();

const HashPassword = async(Password) => {
    const response = await bcrypt.hash(Password, 10);
    return response;
}

router.post('/', RegisterValidationCheck, async(req, res) => {
    const { Username, Password, Phone } = req.body;
    const HashedPassword = await HashPassword(Password);
    const Data = { Username, Password: HashedPassword, Phone };
    const RegistrationData = new RegistrationModel(Data);
    const response = await RegistrationData.save();
    const Serialized_Data = {...Data, userID: response._id, error: false};
    jwt.sign(Serialized_Data, process.env.JWT_AUTH_TOKEN, async(err, token) => {
        if (!err) {
            return res.json({...Serialized_Data, token});
        }
        return {error: true};
    })
});

export default router;
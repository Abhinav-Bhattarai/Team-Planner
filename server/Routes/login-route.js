import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import LoginCredentialCheck from "../Middleware/login-auth-middleware.js";
import RegistrationModel from "../Model/RegistrationModel.js";
dotenv.config();

const router = express.Router();

router.post("/", LoginCredentialCheck, async (req, res) => {
  const { Username, Password } = req.body;
  const response = await RegistrationModel.findOne({ Username });
  if (response) {
    const DATA = {
      Username: response.Username,
      Phone: response.Phone,
      Password: response.Password,
      userID: response._id,
    };
    const HashCheck = await bcrypt.compare(Password, response.Password);
    if (HashCheck) {
      const token = await jwt.sign(DATA, process.env.JWT_AUTH_TOKEN);
      return res.json({...DATA, token});
    } else {
      return res.json({ invalid_credential: true });
    }
  } else {
    return res.json({ invalid_credential: true });
  }
});

export default router;

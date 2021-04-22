import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", (req, res) => {
  const { token, userID } = req.body;
  jwt.verify(token, process.env.JWT_AUTH_TOKEN, (err, data) => {
    if (!err) {
      if (data.userID === userID) {
        return res.json({ access: true });
      } else {
        return res.json({ access: false });
      }
    } else {
      return res.json({ access: false });
    }
  });
});

export default router;
import jwt  from "jsonwebtoken";
import {JWT_SECRET} from '../config.js';

export const tokenSign = async (user) => {
  /* JWT => Payload  */
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

export const decodeSign = (token) => {
  return jwt.decode(token, null);
};
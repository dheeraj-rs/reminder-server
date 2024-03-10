import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import Users from "../model/authModel";
import dotenv from "dotenv";
dotenv.config();
export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.json({ status: false });
    }
    const decodedToken = jwt.verify(token, process.env.SECT_CODE as Secret) as {
      id: string;
    };
    const user = await Users.findById(decodedToken.id);
    if (user) {
      return res.json({
        status: true,
        user: user._id,
        username: user.username,
      });
    }
    res.json({ status: false });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.json({ status: false });
  }
};

import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../model/authModel";
import dotenv from "dotenv";
import cloudinary from "../middlewares/cloudinary.config";
dotenv.config();
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) =>
  jwt.sign({ id }, process.env.SECT_CODE as Secret, {
    expiresIn: maxAge,
  });

const handleErrors = (err: any) => {
  let errors: any = {};
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.code === 11000) {
    errors.email = "Email is already registered";
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const handleLogin = (user: any, res: Response) => {
  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user._id, status: true });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username, userimage = "" } = req.body;
    const user = await User.create({ email, password, username, userimage });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    handleLogin(user, res);
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

export const userData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = [
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        userimage: user.userimage,
      },
    ];
    res.send({ status: "ok", data: userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ status: "error" });
  }
};

export const profileImage = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    await User.updateOne({ _id: userId }, { userimage: imageUrl });
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ status: "error" });
  }
};

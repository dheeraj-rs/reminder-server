import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserData, UserDetails } from "../types/Type";

const userSchema: Schema<UserData, UserDetails> = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  username: {
    type: String,
    required: [true, "username is Required"],
  },
  userimage: {
    type: String,
  },
});

userSchema.pre<UserData>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<UserData> {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("incorrect password");
  }
  throw new Error("incorrect email");
};

const User = mongoose.model<UserData, UserDetails>("Users", userSchema);

export default User;

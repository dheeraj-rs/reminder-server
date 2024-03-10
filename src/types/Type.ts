import { Document, Model } from "mongoose";

export interface TaskData {
  date: number;
  title: string;
  time: string;
  startTime: string;
  endTime: string;
  icon: string;
  color: string;
  details: readonly string[];
  pinned: boolean;
  personal: boolean;
  userid: string;
}
export interface UserData extends Document {
  email: string;
  password: string;
  username: string;
  userimage: string;
}

export interface UserDetails extends Model<UserData> {
  login: (email: string, password: string) => Promise<UserData>;
}

export interface taskDetails extends Document {
  userid: string;
  todos: TaskData[];
}

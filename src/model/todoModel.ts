import { model, Schema } from "mongoose";
import { TaskData, taskDetails } from "../types/Type";

const TaskItems: Schema<TaskData> = new Schema({
  date: {
    type: Number,
  },
  title: {
    type: String,
  },
  time: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  details: {
    type: [String],
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  personal: {
    type: Boolean,
    default: false,
  },
});

const TaskSchema: Schema<taskDetails> = new Schema({
  userid: String,
  todos: [TaskItems],
});

export default model<taskDetails>("Tasks", TaskSchema);

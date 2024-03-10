import { Request, Response } from "express";
import todoModel from "../model/todoModel";
import { TaskData } from "../types/Type";

export const addData = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      date,
      title,
      time,
      startTime,
      endTime,
      icon,
      color,
      details,
      pinned,
      personal,
      userid,
    }: TaskData = req.body.newTask;

    let newTodo = await todoModel.findOne({ userid });

    if (!newTodo) {
      newTodo = new todoModel({
        userid,
        todos: [
          {
            date,
            title,
            time,
            startTime,
            endTime,
            icon,
            color,
            details,
            pinned,
            personal,
          },
        ],
      });
    } else {
      newTodo.todos.push({
        date,
        title,
        time,
        startTime,
        endTime,
        icon,
        color,
        details,
        pinned,
        personal,
        userid: "",
      });
    }

    await newTodo.save();
    res.status(201).json({ status: true, newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

export const listData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userid } = req.query;

    
    const existingTodo = await todoModel.findOne({ userid });

    if (!existingTodo) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    res.status(200).json({ status: true, todos: existingTodo.todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

export const updatePinned = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { pinned } = req.body;

  try {
    // Find the task by _id and update the pinned status of the nested task
    const updatedTask = await todoModel.findOneAndUpdate(
      { "todos._id": taskId }, // Match by the nested task _id field
      { $set: { "todos.$.pinned": pinned } }, // Update pinned status in the nested array
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Send the updated task as a response
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating pinned status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = req.params.id;
  try {
    const updatedTodo = await todoModel.findOneAndUpdate(
      { "todos._id": taskId },
      { $pull: { todos: { _id: taskId } } },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateData = async (
  req: Request,
  res: Response
): Promise<void> => {
  // console.log("haaiiiiii");

  const taskId = req.params.id;
  const updatedTasks = req.body.updatedTask;

  try {
    const updatedTask = await todoModel.findOneAndUpdate(
      { "todos._id": taskId },
      { $set: { "todos.$": updatedTasks } },
      { new: true }
    );
    // console.log(updatedTask);

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ status: true, updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "An error occurred." });
  }
};

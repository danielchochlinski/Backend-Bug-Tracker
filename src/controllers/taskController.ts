import { Request, Response } from "express";
import { Task } from "../models/taskModel";

export const getTasks = async (req: Request, res: Response) => {
  const projectTickets = req.projectTickets;

  try {
    const tasks = await Task.find({
      _id: {
        $in: projectTickets
      }
    }).lean();

    return res.send({ status: "Success", data: tasks });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const getSingleTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId).lean();

    return res.send({ status: "Success", data: task });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, status, priority, type } = req.body;
  try {
    const tasks = await Task.create({ title, status, priority, type });

    return res.send({
      status: "Success",
      message: "Task has been created",
      data: tasks
    });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const update = req.body;
  try {
    await Task.findByIdAndUpdate(taskId, update);
    return res.send({
      status: "Success",
      message: `Task ${taskId} has been succesfully updated`
    });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    return res.send({
      status: "Success",
      message: `Task ${taskId} has been succesfully deleted`
    });
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
};

import { Request, Response } from "express";
import { Task } from "../models/taskModel";
import { Project } from "../models/projectModel";

export const getTasks = async (req: Request, res: Response) => {
  const projectTickets = req.projectTasks;
  console.log(req.projectTasks);
  try {
    const tasks = await Task.find({
      _id: {
        $in: projectTickets
      }
    }).lean();
    // console.log(tasks, "tasks");
    return res.send({ status: "Success", data: tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

export const getSingleTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId).lean();

    return res.send({ status: "Success", data: task });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const task = req.body;

  try {
    const newTask = await Task.create(task);
    await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { tasks: newTask._id }
      },
      { new: true }
    );
    return res.send({
      status: "Success",
      message: "Task has been created",
      data: newTask
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

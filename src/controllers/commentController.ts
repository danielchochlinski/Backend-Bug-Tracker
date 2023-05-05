import { Request, Response } from "express";
import { Comment } from "../models/commentModel";
import { Ticket } from "../models/ticketModel";
import { Task } from "../models/taskModel";
import { Project } from "../models/projectModel";

export const createComment = async (req: Request, res: Response) => {
  const comment = req.body;
  const { orgId, projectId, taskId, ticketId } = req.params;

  try {
    let parent;
    let commentType;
    switch (true) {
      case Boolean(orgId):
        return res
          .status(400)
          .json({ message: "Cannot add comments to organization" });
      case Boolean(ticketId):
        parent = await Ticket.findById(ticketId);
        commentType = "comments";
        break;
      case Boolean(taskId):
        parent = await Task.findById(taskId);
        commentType = "comments";
        break;
      case Boolean(projectId):
        parent = await Project.findById(projectId);
        commentType = "comments";
        break;
      default:
        return res.status(400).json({ message: "Invalid URL" });
    }
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    const newComment = new Comment(comment);

    parent[commentType].push(newComment._id);
    await newComment.save();
    await parent.save();

    res.send(401).json({
      status: "Success",
      message: "Comment succesfully created",
      data: newComment
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

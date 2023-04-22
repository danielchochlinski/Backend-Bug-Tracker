import { Project } from "../models/projectModel";
import { Ticket } from "../models/ticketModel";
import { Request, Response } from "express";
import { TicketModelInterface } from "../models/types";
import { Task } from "../models/taskModel";

// @desc       Get single ticket associated with the task
// @router     GET organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId
// @access     Private auth / userAuthProject
export const getSingleTicket = async (req: Request, res: Response) => {
  const ticketId = req.params.ticketId;
  try {
    // find the task based on taskId
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).send({ error: "Task not found" });
    }
    return res.send({
      status: "Success",
      message: "Ticket found",
      data: ticket
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc       Get all tickets associated with the task
// @router     GET organization/:orgId/project/:projectId/task/:taskId/tickets
// @access     Private auth / userAuthProject
export const getTickets = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  try {
    // find the task based on taskId
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    // get all the task tickets ids
    const ticketIds = task.tickets;

    // find all the ticket documents based on the ids
    const tickets = await Ticket.find({ _id: { $in: ticketIds } });

    return res.send({
      status: "Success",
      message: "Tickets found",
      data: tickets
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc       Create ticket inside a task
// @router     POST organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId
// @access     Private auth / userAuthProject
export const createTicket = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const { title, status, priority, type } = req.body;
  try {
    const newTicket = (await Ticket.create({
      title,
      status,
      priority,
      type
    })) as unknown as TicketModelInterface;
    await Task.findByIdAndUpdate(
      taskId,
      {
        $push: { tickets: newTicket._id }
      },
      { new: true }
    );

    return res.send({
      status: "Success",
      message: "Ticket created",
      data: newTicket
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc       Updates  ticket inside a task
// @router     PUT organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId
// @access     Private auth / userAuthProject
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const ticketId = req.params.ticketId;
    const update = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true
    });

    return res.send({
      status: "Success",
      message: "Ticket has been updated",
      data: updatedTicket
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc       Deletes  ticket inside a task
// @router     DELETE organization/:orgId/project/:projectId/task/:taskId/ticket/:ticketId
// @access     Private auth / userAuthProject
export const deleteTicket = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const ticketId = req.params.ticketId;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    await Task.findByIdAndUpdate(
      taskId,
      { $pull: { tickets: ticketId } },
      { new: true }
    );
    await Ticket.findByIdAndDelete(ticketId);

    return res.send({
      status: "Success",
      message: `Ticket ${ticketId} has been succesfully deleted`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

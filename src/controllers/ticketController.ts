import { Project } from "../models/projectModel";
import { Ticket } from "../models/ticketModel";
import { Request, Response } from "express";
import { TicketModelInterface } from "../models/types";
import { dynamicUpdate } from "../extra/dynamicUpdate";

// @desc       Create ticket inside a project
// @router     POST /api/projects/:projectId/create-ticket
// @access     Private
export const createTicket = async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const { title, status, priority, type } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(400).json({ status: "Failed", message: "Projet not found" });
    }
    if (project) {
      const newTicket: TicketModelInterface = new Ticket({
        title,
        status,
        priority,
        type,
      }) as unknown as TicketModelInterface;

      await newTicket.save();

      project.tickets.push(newTicket);

      await project.save();

      return res.send({
        status: "Success",
        message: "Ticket created",
        data: newTicket,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc       Update ticket inside a project
// @router     POST /api/projects/:projectId/tickets/:ticketId
// @access     Private
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const ticketId = req.params.ticketId;
    const update = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, update, {
      new: true,
    });

    return res.send({
      status: "Success",
      message: "Ticket has been updated",
      data: updatedTicket,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc       Delete ticket inside a project
// @router     DELETE /api/projects/:projectId/tickets/:ticketId
// @access     Private
export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const ticketId = req.params.ticketId;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    await Project.findByIdAndUpdate(
      projectId,
      { $pull: { tickets: ticketId } },
      { new: true }
    );
    await Ticket.findByIdAndDelete(ticketId);

    return res.send({
      status: "Success",
      message: `Ticket ${ticketId} has been succesfully deleted`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

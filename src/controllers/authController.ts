import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationMail } from "../utilities/sendVerificationMail";
import { Project } from "../models/projectModel";
import { sendInvitationMail } from "../utilities/sendInviteMail";

export const inviteToProject = async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const email = req.body;
  try {
    const user = await User.findOne({ email });
    // if(user) return res.status(200).send({message: "Email already registered, add user by id"})
    const project = await Project.findById(projectId);
    const info = { projectName: project?.name, projectId: project?._id };
    if (!project) return res.status(404).send({ error: "Project not found!" });
    const { _id: adminId } = req.user;

    const admin = await User.findById(adminId);
    if (!admin) return res.status(404).send({ error: "No user found" });
    await sendInvitationMail(admin, email, info);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

// @desc        Creat user using invitation link and add to project
// @router      POST /api/registration/projects/:projectId/invite
// @access      Private (only invite link)
export const acceptInviteToProjectRegistration = async (
  req: Request,
  res: Response
) => {
  const projectId = req.params.projectId;
  const { name, surname, email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("-password");

    const userExist = await Project.findOne({
      _id: projectId,
      "users._id": user?.email,
    });

    if (userExist)
      return res.status(400).send({ error: "User already is in the project" });
    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      surname,
      email,
      hashpassword,
      verified: true,
      emailToken: null,
    });
    const project = await Project.findOneAndUpdate(
      { projectId },
      { $push: { users: [{ _id: user?._id, admin: false, role: 0 }] } },

      { new: true }
    );
    return res.send({
      status: "Success",
      message: `User ${newUser?.email} succesfully created and added to the ${project?.name} project `,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        status: "Failed",
        message: "User already exisits",
      });
    }

    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashpassword,
      emailToken: crypto.randomUUID(),
    });

    if (newUser) {
      sendVerificationMail(newUser);
      return res.status(201).json({
        status: "Success",
        data: {
          user: newUser,
          token: generateToken(newUser._id),
        },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: "Failed",
        message: "User not found",
      });
    if (user && user.verified === false)
      return res.status(401).json({
        status: "Failed",
        message: "Please validate the email",
      });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        status: "Success",
        data: { user, token: generateToken(user._id) },
      });
    } else {
      return res.status(400).json({
        status: "Failed",
        message: "login information incorrect",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Server error" });
  }
};

//Generate GWT
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "30d",
  });
};

// POST
//
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken)
      res.status(400).json({
        status: "Failed",
        message: "EmailToken not found",
      });

    const update = {
      verified: true,
      emailToken: null,
    };

    const user = await User.findOneAndUpdate(emailToken, update, {
      new: true,
    });
    if (user) {
      return res.status(200).json({
        status: "Success",
        data: { user },
      });
    } else {
      return res.status(404).json({
        status: "Failed",
        message: "Verification failed invalid token",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

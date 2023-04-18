import { Project } from "../../../models/projectModel";
import { Request, Response } from "express";
import { User } from "../../../models/userModel";
import { sendInvitationMail } from "../../../utilities/sendInviteMail";
import bcrypt from "bcryptjs";

// @desc        Creat user using invitation link and add to project or send invite to user if exisits
// @router      POST //api/registration/project/:projectId/invite"
// @access      Private
export const inviteToProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { email } = req.body;
  try {
    //check for project inside DB
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).send({ error: "Project not found!" });

    //check for user in db
    const user = await User.findOne({ email }).lean();
    console.log(user);
    console.log(projectId);
    //check if user already inside this project
    const userExists = await Project.exists({
      _id: projectId,
      "users._id": user._id,
    });

    if (userExists)
      return res.status(200).send({ message: "User already in the project" });

    if (user) {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { invitations: projectId } },
        { new: true }
      );
      res.send({
        status: "Success",
        message: "Invite has been sent to the user",
        data: updatedUser,
      });
    } else {
      //prepare info to send via mail
      const info = { projectName: project?.name, projectId: project?._id };
      const { _id: adminId } = req.user;

      const admin = await User.findById(adminId);
      if (!admin) return res.status(404).send({ error: "No user found" });
      const addUserToPendingInvites = await Project.findByIdAndUpdate(
        projectId,
        { $push: { pendingUsers: { email } } },

        { new: true }
      );
      await sendInvitationMail(admin, email, info);
      res.send({
        status: "Success",
        message: `Email sent to ${email}`,
        data: addUserToPendingInvites,
      });
    }
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
  const { projectId } = req.params;
  const { name, surname, email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("-password");

    const userInProject = await Project.findOne({
      _id: projectId,
      "users._id": user?._id,
    });

    if (userInProject)
      return res.status(400).send({ error: "User already is in the project" });

    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashpassword,
      verified: true,
      emailToken: null,
    });

    const project = await Project.findByIdAndUpdate(
      projectId,

      {
        $addToSet: { users: { _id: newUser?._id, admin: false, role: 0 } },
        $pull: { pendingUsers: { email: email } },
      },
      {
        new: true,
      }
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

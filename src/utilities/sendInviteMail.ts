import { UserModelInterface } from "../models/types";
import { createMailTransporter } from "./createMailTransporter";

interface ProjectInfoT {
  projectId: string;
  projectName: string;
}
export const sendInvitationMail = async (
  admin: UserModelInterface,
  email: string,
  project: any
) => {
  const transporter = createMailTransporter();
  const { projectId, projectName } = project;
  const mailTemplate = {
    from: "Bug Tracker",
    to: email,
    subject: "Invitation to join project",
    html: `<p>Hello ${email} you have been invited to join ${projectName} project by ${admin.email}.</p>
    <a href="${process.env.CLIENT_URL}/registration/project/${projectId}/invite">Click this link to join the project</a>
    `,
  };
  (await transporter).sendMail(mailTemplate, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Verification email sent");
    }
  });
};

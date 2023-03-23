import { UserModelInterface } from "../models/types";
import { createMailTransporter } from "./createMailTransporter";

export const sendVerificationMail = async (user: UserModelInterface) => {
  const transporter = createMailTransporter();

  const mailTemplate = {
    from: "Bug Tracker",
    to: user.email,
    subject: "Verify your account!",
    html: `<p>Hello ${user.name} please verify your account.</p>
    <a href="${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}">Verify your account</a>
    `,
  };
  (await transporter).sendMail(mailTemplate, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification email sent");
    }
  });
};

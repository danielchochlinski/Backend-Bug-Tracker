import nodemailer from "nodemailer";

export const createMailTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "bug-tracker-app@outlook.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transporter;
};

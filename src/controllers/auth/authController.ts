import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../models/userModel";
import { sendVerificationMail } from "../../utilities/sendVerificationMail";
import generateToken from "../../extra/generateToken";

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

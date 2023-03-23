import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
// import type { JwtPayload } from "jsonwebtoken";

// interface TokenType {
//   id: string;
// }
export const auth = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || ""
      );
      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (err) {
      res.status(401).json({
        status: "failed",
      });
      console.log(err);
    }
  }
  if (!token) res.status(401).json({ status: "Not authorized" });
};

import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
// import type { JwtPayload } from "jsonwebtoken";

// interface TokenType {
//   id: string;
// }
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers && req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || ""
      );
      req.user = await User.findById(decodedToken.id);

      next();
    } catch (err) {
      return res.status(401).json({
        status: "failed"
      });
    }
  }
  if (!token) return res.status(401).json({ status: "Not authorized" });
};

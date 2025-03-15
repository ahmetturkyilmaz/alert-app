import type { NextFunction, Request, Response } from "express";
import { authService } from "../services";

export const authHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Token is required" });
    return;
  }

  try {
    const decoded = await authService.verifyJWT(token);
    req.user = decoded.userId;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

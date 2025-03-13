import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction): void => {
	const secretKey = process.env.SECRET_KEY || "";

	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		res.status(403).json({ message: "Token is required" });
		return;
	}

	jwt.verify(token, secretKey, (err: any, decoded: any) => {
		if (err) {
			res.status(401).json({ message: "Invalid or expired token" });
			return;
		}
		if (decoded && typeof decoded === "object" && "userId" in decoded) {
			req.user = (decoded as JwtPayload).userId;
			next();
		} else {
			return res.status(401).json({ message: "Invalid token structure" });
		}
	});
};

export default auth;

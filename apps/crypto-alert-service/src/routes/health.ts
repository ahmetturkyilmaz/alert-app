import express, { type Request, type Response } from "express";

export const healthCheck = express.Router();

healthCheck.get("", (req: Request, res: Response) => {
	res.sendStatus(200);
});

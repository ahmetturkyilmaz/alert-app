import request from "supertest";
import { prisma } from "../src/db/prisma";
import { getResponse } from "../src/utils/getResponse";
require("dotenv").config();

import { app } from "../src";

jest.mock("../src/db/prisma", () => ({
	prisma: {
		alerts: {
			findMany: jest.fn(),
			create: jest.fn(),
		},
	},
}));

describe("Alerts API", () => {
	const mockUser = 1;
	const mockAlerts = [
		{ id: 1, user: mockUser, condition: ">", targetPrice: "5000", symbol: "BTCUSDT" },
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("GET /alerts", () => {
		it("should return all alerts for the user", async () => {
			(prisma.alerts.findMany as jest.Mock).mockResolvedValue(mockAlerts); // Mock the response
			process.env.JWT_SECRET = "bilira"
			const res = await request(app)
				.get("/api/alerts")
				.set(
					"Authorization",
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.IMAHjoM9_YlMcuyWMRAD1-4Yd0Q-9neuHSznjog6nnY"
				);

			expect(res.status).toBe(200);
			expect(res.body).toEqual(getResponse.success(mockAlerts));
		});
	});

	describe("POST /alerts", () => {
		it("should create a new alert", async () => {
			const newAlert = {
				condition: ">",
				targetPrice: 6000,
				symbol: "ETHUSDT",
			};

			// Mock create
			(prisma.alerts.create as jest.Mock).mockResolvedValue({
				id: 2,
				user: mockUser,
				...newAlert,
			});

			const res = await request(app)
				.post("/api/alerts")
				.set(
					"Authorization",
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.IMAHjoM9_YlMcuyWMRAD1-4Yd0Q-9neuHSznjog6nnY"
				)
				.send(newAlert);

			expect(res.status).toBe(200);
			expect(res.body.data).toHaveProperty("id", 2);
			expect(res.body.data).toMatchObject(newAlert);
		});

		it("should return validation error for invalid data", async () => {
			const res = await request(app)
				.post("/api/alerts")
				.set(
					"Authorization",
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.IMAHjoM9_YlMcuyWMRAD1-4Yd0Q-9neuHSznjog6nnY"
				)
				.send({ condition: "invalid", targetPrice: "46000", symbol: "UNKNOWN" });

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty("errorCode");
		});
	});
});

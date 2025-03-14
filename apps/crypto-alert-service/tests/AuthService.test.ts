import jwt, {type JwtPayload, type  VerifyErrors} from "jsonwebtoken";
import {AuthService} from "../src/services/AuthService";

jest.mock("jsonwebtoken");

describe("AuthService - verifyJWT", () => {
    let authService: AuthService;

    beforeAll(() => {
        process.env.JWT_SECRET_KEY = "test_secret";
        authService = new AuthService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should resolve with decoded payload when token is valid", async () => {
        const mockPayload: JwtPayload = {userId: "123", role: "admin"};
        (jwt.verify as jest.Mock).mockImplementation(
            (token: string, secret: string, callback: (err: VerifyErrors | null, decoded?: string | JwtPayload) => void) => {
                callback(null, mockPayload);
            }
        );

        await expect(authService.verifyJWT("valid_token")).resolves.toEqual(mockPayload);
    });

    it("should reject with an error when token is invalid", async () => {
        const mockError = new Error("Invalid token");
        (jwt.verify as jest.Mock).mockImplementation(
            (token: string, secret: string, callback: (err: Error) => void) => {
                callback(mockError);
            }
        );

        await expect(authService.verifyJWT("invalid_token")).rejects.toThrow("Invalid token");
    });

    it("should reject with an error when token structure is invalid", async () => {
        (jwt.verify as jest.Mock).mockImplementation(
            (token: string, secret: string, callback: (err: VerifyErrors | null, decoded?: string | JwtPayload) => void) => {
                callback(null, "invalid_string_response");
            }
        );

        await expect(authService.verifyJWT("valid_token")).rejects.toThrow("Invalid token structure");
    });
});

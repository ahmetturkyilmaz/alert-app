import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";

export class AuthService {
  private readonly _jwtSecretKey = process.env.JWT_SECRET_KEY || "";

  verifyJWT(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this._jwtSecretKey,
        (
          err: VerifyErrors | null,
          decoded: JwtPayload | string | undefined,
        ) => {
          if (err) {
            reject(err);
          } else if (decoded && typeof decoded === "object") {
            resolve(decoded as JwtPayload);
          } else {
            reject(new Error("Invalid token structure"));
          }
        },
      );
    });
  }
}

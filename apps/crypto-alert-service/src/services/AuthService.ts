import jwt from "jsonwebtoken";

export class AuthService {
    private readonly _jwtSecretKey;

    constructor(jwtSecretKey: string) {
        this._jwtSecretKey = jwtSecretKey;
    }

    verifyJWT(token: string, callback: (err: any, decoded: any) => void) {
        return jwt.verify(token, this._jwtSecretKey, callback);
    }
}

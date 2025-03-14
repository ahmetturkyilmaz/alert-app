import {prisma} from "../db/prisma";
import {AlertService} from "./AlertService";
import {AuthService} from "./AuthService";

export const alertService = new AlertService(prisma);
export const authService = new AuthService();

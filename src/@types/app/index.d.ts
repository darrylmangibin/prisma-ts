import { User } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

declare module "app";

declare global {
  interface AppRoute {
    path: string;
    router: Router;
    registerRoutes: () => void;
  }

  interface AppPayload extends jwt.JwtPayload {
    id: number;
  }

  var AuthUser: User;

  interface SignInInterface {
    user: User;
    token: string;
  }

  var signIn: (data?: Partial<User>) => Promise<SignInInterface>;

  namespace Express {
    interface Request {
      user: User;
    }
  }
}

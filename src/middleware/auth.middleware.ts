import prisma from "@main/client";
import ErrorException from "@utils/exceptions/error.exception";
import verifyToken from "@utils/token/verify.token";
import { RequestHandler } from "express";

const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    let token: string | null = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const [_bearer, _token] = req.headers.authorization.split(" ");

      token = _token;
    }

    if (!token) {
      throw new ErrorException("Unauthorized. No token", 401);
    }

    const decoded = verifyToken(token);

    const user = await prisma.user.findFirst({ where: { id: decoded.id } });

    if (!user) {
      throw new ErrorException("Unauthorized. No user", 401);
    }

    req.user = user;
    global.AuthUser = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;

import ErrorException from "@utils/exceptions/error.exception";
import { RequestHandler } from "express";

const adminMiddleware: RequestHandler = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }

  return next(new ErrorException("Admin only can access this route", 403));
};

export default adminMiddleware;

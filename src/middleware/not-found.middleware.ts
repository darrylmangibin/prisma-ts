import { RequestHandler } from "express";

const notFoundMiddleware: RequestHandler = (req, res, next) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.path} does not exists`,
  });
};

export default notFoundMiddleware;

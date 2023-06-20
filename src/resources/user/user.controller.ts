import { RequestHandler } from "express";
import UserService from "./user.service";

class UserController {
  private userService = new UserService();

  public getUsers: RequestHandler = async (req, res, next) => {
    try {
      const pageNumber = Number(req.query.pageNumber || 1);
      const pageSize = Number(req.query.pageSize || 10);

      const results = await this.userService.findUsers(pageNumber, pageSize, {
        where: {
          NOT: {
            id: req.user.id,
          },
        },
      });

      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };

  public getUserById: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.findUserById(
        Number(req.params.userId)
      );

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getUserAndUpdate: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.findUserAndUpdate(
        Number(req.params.userId),
        req.body
      );

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getUserAndDelete: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.findUserAndDelete(
        Number(req.params.userId)
      );

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;

import UserService from "@resources/user/user.service";
import signToken from "@utils/token/sign.token";
import { RequestHandler } from "express";
import AuthService from "./auth.service";

class AuthController {
  private userService = new UserService();
  private authService = new AuthService();

  public register: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);

      const token = signToken({ id: user.id });

      return res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public login: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.authService.loginUser(req.body);

      const token = signToken({ id: user.id });

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public getProfile: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.findUserById(req.user.id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateProfile: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.findUserAndUpdate(
        req.user.id,
        req.body
      );

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.userService.findUserAndDelete(req.user.id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

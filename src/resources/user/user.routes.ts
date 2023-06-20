import adminMiddleware from "@middleware/admin.middleware";
import authMiddleware from "@middleware/auth.middleware";
import validationMiddleware from "@middleware/validation.middleware";
import { Router } from "express";
import UserController from "./user.controller";
import { userUpdateValidation } from "./user.validation";

class UserRoutes implements AppRoute {
  public path = "users";
  public router = Router();

  private userController = new UserController();

  constructor() {
    this.registerRoutes();
  }

  public registerRoutes() {
    this.router.route("/").get(authMiddleware, this.userController.getUsers);

    this.router
      .route("/:userId")
      .get(authMiddleware, this.userController.getUserById)
      .put(
        authMiddleware,
        adminMiddleware,
        validationMiddleware(userUpdateValidation),
        this.userController.getUserAndUpdate
      )
      .delete(
        authMiddleware,
        adminMiddleware,
        this.userController.getUserAndDelete
      );
  }
}

export default UserRoutes;

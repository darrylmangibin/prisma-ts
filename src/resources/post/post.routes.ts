import authMiddleware from "@middleware/auth.middleware";
import validationMiddleware from "@middleware/validation.middleware";
import { Router } from "express";
import PostController from "./post.controller";
import { postCreateOrUpdateValidation } from "./post.validation";

class PostRoutes implements AppRoute {
  public path = "posts";
  public router = Router();

  private postController = new PostController();

  constructor() {
    this.registerRoutes();
  }

  public registerRoutes() {
    this.router
      .route("/")
      .post(
        authMiddleware,
        validationMiddleware(postCreateOrUpdateValidation),
        this.postController.createPost
      )
      .get(authMiddleware, this.postController.getManyPosts);
  }
}

export default PostRoutes;

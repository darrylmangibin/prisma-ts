import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import PostService from "./post.service";

class PostController {
  private postService = new PostService();

  public createPost: RequestHandler = async (req, res, next) => {
    try {
      const post = await this.postService.create({
        ...req.body,
        userId: req.user.id,
      });

      return res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };

  public getManyPosts: RequestHandler = async (req, res, next) => {
    try {
      const pageNumber = Number(req.query.pageNumber || 1);
      const pageSize = Number(req.query.pageSize || 10);
      const filter = req.query.filter as unknown as Prisma.PostFindManyArgs;

      const results = await this.postService.findMany(
        pageNumber,
        pageSize,
        filter
      );

      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;

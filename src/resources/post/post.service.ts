import prisma from "@main/client";
import { Post, Prisma, User } from "@prisma/client";
import dataPagination from "@utils/pagination/data.pagination";

class PostService {
  public async create(body: Omit<Post, "id">) {
    try {
      const post = await prisma.post.create({
        data: body,
      });

      return post;
    } catch (error) {
      throw error;
    }
  }

  public async findMany(
    pageNumber: number,
    pageSize: number,
    query?: Prisma.PostFindManyArgs
  ) {
    try {
      const results = await dataPagination<Post>(
        "Post",
        pageNumber,
        pageSize,
        query
      );

      return results;
    } catch (error) {
      throw error;
    }
  }

  public async findById(
    postId: number,
    query?: Prisma.PostFindFirstOrThrowArgs
  ) {
    try {
      const post = await prisma.post.findFirstOrThrow({
        where: { id: postId },
        ...query,
      });

      return post;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;

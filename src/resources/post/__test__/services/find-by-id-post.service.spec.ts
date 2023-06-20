import { Post, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import PostFactory from "@resources/post/post.factory";
import PostService from "@resources/post/post.service";

describe("@resources/post/post.service", () => {
  describe("PostService findById", () => {
    let post: Post;

    beforeEach(async () => {
      post = await new PostFactory().create();
    });

    it("should throw error when no post found", async () => {
      const randomId = 0;

      await new PostService().findById(randomId).catch((error) => {
        expect(error).toBeInstanceOf(PrismaClientKnownRequestError);
      });
    });

    it("should return post", async () => {
      const postInfo = await new PostService().findById(post.id, {
        include: { user: true },
      });

      console.log(postInfo);
    });
  });
});

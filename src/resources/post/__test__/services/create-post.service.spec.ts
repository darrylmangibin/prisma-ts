import { faker } from "@faker-js/faker";
import prisma from "@main/client";
import { Post } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import PostService from "@resources/post/post.service";
import UserFactory from "@resources/user/user.factory";

describe("@resources/post/post.service", () => {
  describe("PostService create", () => {
    const postData = {
      title: faker.lorem.sentence(),
      body: faker.lorem.sentence(),
    } satisfies Omit<Post, "id" | "userId">;

    it("should throw error when inputs are invalid", async () => {
      // @ts-ignore
      await new PostService().create({}).catch((error) => {
        expect(error).toBeInstanceOf(PrismaClientValidationError);
      });
    });

    it("should return created post", async () => {
      const user = await new UserFactory().create();

      const post = await new PostService().create({
        ...postData,
        userId: user.id,
      });

      expect(post).toMatchObject({
        id: expect.any(Number),
        ...postData,
        userId: user.id,
      });
      expect(
        await prisma.post.findFirst({ where: { id: post.id } })
      ).not.toBeNull();
    });
  });
});

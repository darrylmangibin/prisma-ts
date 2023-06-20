import { faker } from "@faker-js/faker";
import { app } from "@main/server";
import { Post } from "@prisma/client";
import supertest from "supertest";

const endpoint = "/api/posts";

describe("@resources/post/post.controller", () => {
  describe(`PostController createPost POST ${endpoint}`, () => {
    let loggedInUser: SignInInterface;
    const postData = {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    } satisfies Omit<Post, "id" | "userId">;

    beforeEach(async () => {
      loggedInUser = await signIn();
    });

    it("should return 422 error response", async () => {
      const res = await supertest(app)
        .post(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send({});

      expect(res.status).toBe(422);
      expect(res.body).toMatchObject({
        message: "Validation failed",
        error: expect.objectContaining({
          title: expect.any(String),
          body: expect.any(String),
        }),
      });
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app)
        .post(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send(postData);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: expect.any(Number),
        userId: loggedInUser.user.id,
        ...postData,
      });
    });
  });
});

import { app } from "@main/server";
import { Prisma } from "@prisma/client";
import PostFactory from "@resources/post/post.factory";
import keysPagination from "@utils/pagination/keys.pagination";
import qs from "qs";
import supertest from "supertest";

const endpoint = "/api/posts";

describe("@resources/post/post.controller", () => {
  describe(`PostController findManyPost GET ${endpoint}`, () => {
    let loggedInUser: SignInInterface;

    beforeEach(async () => {
      loggedInUser = await signIn();
    });

    it("should return 200 success response", async () => {
      const postsBatchPayload = await new PostFactory().createMany(6);
      const pageNumber = 1;
      const pageSize = 3;

      const filter = {
        include: {
          user: true,
        },
      } satisfies Prisma.PostFindManyArgs;

      const res = await supertest(app)
        .get(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .query(
          qs.stringify({
            pageNumber,
            pageSize,
            filter,
          })
        );

      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(keysPagination)
      );
      expect(res.body.data.length).toEqual(pageSize);
      expect(res.body.totalCount).toEqual(postsBatchPayload.count);
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: expect.objectContaining({
              id: expect.any(Number),
            }),
          }),
        ])
      );
    });
  });
});

import { app } from "@main/server";
import { Prisma } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import keysPagination from "@utils/pagination/keys.pagination";
import supertest from "supertest";

const endpoint = "/api/users";

describe("@resources/users/user.controller", () => {
  describe(`UserController getUsers GET ${endpoint}`, () => {
    let usersBatchPayload: Prisma.BatchPayload;
    let loggedInUser: SignInInterface;

    beforeEach(async () => {
      usersBatchPayload = await new UserFactory().createMany(6);
      loggedInUser = await signIn();
    });

    it("should return 200 success response", async () => {
      const pageNumber = 1;
      const pageSize = 3;

      const res = await supertest(app)
        .get(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .query({
          pageNumber,
          pageSize,
        });

      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(keysPagination)
      );
      expect(res.body.data.length).toEqual(pageSize);
      expect(res.body.totalCount).toEqual(usersBatchPayload.count);
    });
  });
});

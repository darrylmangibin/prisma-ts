import { app } from "@main/server";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import supertest from "supertest";

const endpoint = "/api/users";

describe("@resources/user/user.controller", () => {
  describe(`UserController getUserById GET ${endpoint}/:userId`, () => {
    let user: User;
    let loggedInUser: SignInInterface;

    beforeEach(async () => {
      user = await new UserFactory().create();
      loggedInUser = await signIn();
    });

    it("should return 404 error response", async () => {
      const randomId = 0;

      const res = await supertest(app)
        .get(`${endpoint}/${randomId}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`);

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({
        message: "No User found",
      });
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app)
        .get(`${endpoint}/${user.id}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(user);
    });
  });
});

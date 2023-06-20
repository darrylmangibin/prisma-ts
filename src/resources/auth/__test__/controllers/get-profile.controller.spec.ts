import { app } from "@main/server";
import UserService from "@resources/user/user.service";
import supertest from "supertest";

const endpoint = "/api/auth/profile";

describe("@resources/auth/auth.controller", () => {
  describe(`AuthController getProfile GET ${endpoint}`, () => {
    let mockFindUserById: jest.SpyInstance;
    let loggedInUser: SignInInterface;

    beforeEach(async () => {
      mockFindUserById = jest.spyOn(UserService.prototype, "findUserById");
      loggedInUser = await signIn();
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app)
        .get(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(loggedInUser.user);
    });
  });
});

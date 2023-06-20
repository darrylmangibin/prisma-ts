import { app } from "@main/server";
import supertest from "supertest";

const endpoint = "/api/auth/profile";

describe("@resources/auth/auth.controller", () => {
  describe(`AuthController deleteProfile DELETE ${endpoint}`, () => {
    let loggedInUser: SignInInterface;

    beforeEach(async () => {
      loggedInUser = await signIn();
    });

    it("should delete the currect user", async () => {
      const res = await supertest(app)
        .delete(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(loggedInUser.user);
    });
  });
});

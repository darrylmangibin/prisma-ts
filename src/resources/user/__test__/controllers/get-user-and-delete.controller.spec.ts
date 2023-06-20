import { app } from "@main/server";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import supertest from "supertest";

const endpoint = "/api/users";

describe("@resources/user/user.controller", () => {
  describe(`UserController getUserAndDelete DELETE ${endpoint}/:userId`, () => {
    let loggedInUser: SignInInterface;
    let user: User;

    beforeEach(async () => {
      loggedInUser = await signIn({ role: "admin" });
      user = await new UserFactory().create();
    });

    it("should return 403 error response", async () => {
      const otherLoggedInUser = await signIn();

      const res = await supertest(app)
        .delete(`${endpoint}/${user.id}`)
        .set("Authorization", `Bearer ${otherLoggedInUser.token}`);

      expect(res.status).toBe(403);
      expect(res.body).toMatchObject({
        message: "Admin only can access this route",
      });
    });

    it("should return 404 error response", async () => {
      const randomId = 0;

      const res = await supertest(app)
        .delete(`${endpoint}/${randomId}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`);

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({
        message: "Record to delete does not exist.",
      });
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app)
        .delete(`${endpoint}/${user.id}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(user);
    });
  });
});

import { faker } from "@faker-js/faker";
import { app } from "@main/server";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import supertest from "supertest";

const endpoint = "/api/users";

describe("@resources/user/user.controller", () => {
  describe(`UserController getUserAndUpdate GET ${endpoint}/:userId`, () => {
    let loggedInUser: SignInInterface;
    let user: User;

    const userData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      role: "admin",
    } satisfies Partial<User>;

    beforeEach(async () => {
      loggedInUser = await signIn({ role: "admin" });
      user = await new UserFactory().create();
    });

    it("should return 403 error response", async () => {
      const otherLoggedInUser = await signIn();

      const res = await supertest(app)
        .put(`${endpoint}/${user.id}`)
        .set("Authorization", `Bearer ${otherLoggedInUser.token}`)
        .send(userData);

      expect(res.status).toBe(403);
      expect(res.body).toMatchObject({
        message: "Admin only can access this route",
      });
    });

    it("should return 422 error response", async () => {
      const res = await supertest(app)
        .put(`${endpoint}/${user.id}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send({});

      expect(res.status).toBe(422);
      expect(res.body).toMatchObject({
        message: "Validation failed",
        error: expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
        }),
      });
    });

    it("should return 404 error response", async () => {
      const randomId = 0;

      const res = await supertest(app)
        .put(`${endpoint}/${randomId}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send(userData);

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({
        message: "Record to update not found.",
      });
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app)
        .put(`${endpoint}/${user.id}`)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send(userData);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        ...user,
        ...userData,
      });
    });
  });
});

import { faker } from "@faker-js/faker";
import { app } from "@main/server";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import UserService from "@resources/user/user.service";
import supertest from "supertest";

const endpoint = "/api/auth/profile";

describe("@resources/auth/auth.controller", () => {
  describe(`AuthController updateProfile PUT ${endpoint}`, () => {
    let mockFindUserAndUpdate: jest.SpyInstance;
    let loggedInUser: SignInInterface;
    const userData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
    } satisfies Partial<User>;

    beforeEach(async () => {
      mockFindUserAndUpdate = jest.spyOn(
        UserService.prototype,
        "findUserAndUpdate"
      );
      loggedInUser = await signIn();
    });

    it("should return 400 error response", async () => {
      const otherUser = await new UserFactory().create();

      const res = await supertest(app)
        .put(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send({
          ...userData,
          email: otherUser.email,
        });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        message: "Email already exists",
      });
      expect(mockFindUserAndUpdate).toHaveBeenCalled();
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app)
        .put(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send(userData);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        ...loggedInUser.user,
        ...userData,
      });
      expect(mockFindUserAndUpdate).toHaveBeenCalled();
    });

    it("should return 422 error response", async () => {
      const res = await supertest(app)
        .put(endpoint)
        .set("Authorization", `Bearer ${loggedInUser.token}`)
        .send({});

      expect(res.status).toBe(422);
      expect(res.body).toMatchObject({
        message: "Validation failed",
        error: expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
        }),
      });
      expect(mockFindUserAndUpdate).not.toHaveBeenCalled();
    });
  });
});

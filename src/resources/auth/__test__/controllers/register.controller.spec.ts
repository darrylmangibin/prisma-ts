import { faker } from "@faker-js/faker";
import { app } from "@main/server";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import UserService from "@resources/user/user.service";
import supertest from "supertest";

const endpoint = "/api/auth/register";

describe("@resources/auth/auth.controller", () => {
  describe(`AuthController register POST ${endpoint}`, () => {
    let mockCreateUser: jest.SpyInstance;
    const userData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    } satisfies Omit<User, "id" | "role">;

    beforeEach(async () => {
      mockCreateUser = jest.spyOn(UserService.prototype, "createUser");
    });

    it("should throw 422 error response", async () => {
      const res = await supertest(app).post(endpoint).send({});

      expect(res.statusCode).toBe(422);
      expect(res.body).toMatchObject({
        message: "Validation failed",
        error: expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        }),
      });
      expect(mockCreateUser).not.toHaveBeenCalled();
    });

    it("should return 400 error response", async () => {
      const user = await new UserFactory().create();

      const res = await supertest(app)
        .post(endpoint)
        .send({
          ...userData,
          email: user.email,
        });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        message: "Email already exists",
      });
      expect(mockCreateUser).toHaveBeenCalled();
    });

    it("should return 201 success response", async () => {
      const res = await supertest(app)
        .post(endpoint)
        .send({
          ...userData,
        });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ token: expect.any(String) });
      expect(mockCreateUser).toHaveBeenCalled();
    });
  });
});

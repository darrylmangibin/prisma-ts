import { faker } from "@faker-js/faker";
import { app } from "@main/server";
import { User } from "@prisma/client";
import AuthService from "@resources/auth/auth.service";
import UserFactory from "@resources/user/user.factory";
import verifyToken from "@utils/token/verify.token";
import supertest from "supertest";

const endpoint = "/api/auth/login";

describe("@resources/auth/auth.controller", () => {
  describe(`AuthController login POST ${endpoint}`, () => {
    let mockLoginUser: jest.SpyInstance;
    let user: User;
    const password = faker.internet.password();

    beforeEach(async () => {
      mockLoginUser = jest.spyOn(AuthService.prototype, "loginUser");
      user = await new UserFactory().create({ password });
    });

    it("should return 422 error response", async () => {
      const res = await supertest(app).post(endpoint).send({});

      expect(res.status).toBe(422);
      expect(res.body).toMatchObject({
        message: "Validation failed",
        error: expect.objectContaining({
          email: expect.any(String),
          password: expect.any(String),
        }),
      });
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should return 401 error response", async () => {
      const wrongPassword = faker.internet.password();

      const res = await supertest(app).post(endpoint).send({
        email: user.email,
        password: wrongPassword,
      });

      expect(res.status).toBe(401);
      expect(res.body).toMatchObject({
        message: "Invalid credentials",
      });
      expect(mockLoginUser).toHaveBeenCalled();
    });

    it("should return 200 success response", async () => {
      const res = await supertest(app).post(endpoint).send({
        email: user.email,
        password,
      });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        token: expect.any(String),
      });
      expect(mockLoginUser).toHaveBeenCalled();
      expect(verifyToken(res.body.token)).toMatchObject({ id: user.id });
    });
  });
});

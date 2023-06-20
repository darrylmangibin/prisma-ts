import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import AuthService from "@resources/auth/auth.service";
import UserFactory from "@resources/user/user.factory";
import ErrorException from "@utils/exceptions/error.exception";

describe("@resources/auth/auth.service", () => {
  describe("AuthService loginUser", () => {
    let user: User;
    const password = faker.internet.password();

    beforeEach(async () => {
      user = await new UserFactory().create({ password });
    });

    it("should throw error when no user found", async () => {
      await new AuthService()
        .loginUser({
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(ErrorException);
          expect(error).toMatchObject({
            message: "Invalid credentials",
            statusCode: 401,
          });
        });
    });

    it("should throw error when password incorrect", async () => {
      await new AuthService()
        .loginUser({
          email: user.email,
          password: faker.internet.password(),
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(ErrorException);
          expect(error).toMatchObject({
            message: "Invalid credentials",
            statusCode: 401,
          });
        });
    });

    it("should return user info when credentials are valid", async () => {
      const userInfo = await new AuthService().loginUser({
        email: user.email,
        password,
      });

      expect(userInfo).toMatchObject(user);
    });
  });
});

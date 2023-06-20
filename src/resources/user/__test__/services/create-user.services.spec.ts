import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import UserFactory from "@resources/user/user.factory";
import UserService from "@resources/user/user.service";
import ErrorException from "@utils/exceptions/error.exception";
import comparePassword from "@utils/password/compare.password";

describe("@resources/user/user.service", () => {
  describe("UserService createUser", () => {
    const password = faker.internet.password();

    const userData = {
      email: faker.internet.email(),
      name: faker.name.fullName(),
      password,
      role: "user",
    } satisfies Omit<User, "id">;

    it("should create a user with hashed password", async () => {
      const user = await new UserService().createUser(userData);

      expect(user).toMatchObject({
        id: expect.any(Number),
        ...userData,
        password: expect.any(String),
      });
      expect(user.password).not.toBe(password);
      expect(await comparePassword(password, user.password)).toBeTruthy();
    });

    it("should throw error when inputs are invalid", async () => {
      // @ts-ignore
      await new UserService().createUser({ password }).catch((error) => {
        expect(error).toBeInstanceOf(PrismaClientValidationError);
      });
    });

    it("should throw error when email already exists", async () => {
      const createdUser = await new UserFactory().create();

      await new UserService()
        .createUser({
          ...userData,
          email: createdUser.email,
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(ErrorException);
          expect(error).toMatchObject({
            message: "Email already exists",
            statusCode: 400,
          });
        });
    });
  });
});

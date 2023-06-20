import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import UserFactory from "@resources/user/user.factory";
import UserService from "@resources/user/user.service";

describe("@resources/user/user.service", () => {
  describe("UserService findUserAndUpdate", () => {
    const userData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
    } satisfies Partial<User>;
    let user: User;

    beforeEach(async () => {
      user = await new UserFactory().create();
    });

    it("should throw error when no user found", async () => {
      const randomId = 0;

      await new UserService().findUserAndUpdate(randomId, {}).catch((error) => {
        expect(error).toBeInstanceOf(PrismaClientKnownRequestError);
      });
    });

    it("should return error when email already exists", async () => {
      const otherUser = await new UserFactory().create();

      await new UserService()
        .findUserAndUpdate(user.id, {
          email: otherUser.email,
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(PrismaClientKnownRequestError);
        });
    });

    it("should update the user", async () => {
      const updatedUser = await new UserService().findUserAndUpdate(
        user.id,
        userData
      );

      expect(updatedUser).toMatchObject({
        ...user,
        ...userData,
      });
    });
  });
});

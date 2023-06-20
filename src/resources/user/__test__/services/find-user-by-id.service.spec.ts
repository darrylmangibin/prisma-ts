import UserService from "@resources/user/user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";

describe("@resources/user/user.service", () => {
  describe("UserService findUserById", () => {
    let user: User;

    beforeEach(async () => {
      user = await new UserFactory().create();
    });

    it("should throw error when no user found", async () => {
      const randomId = 0;
      await new UserService().findUserById(randomId).catch((error) => {
        expect(error).toBeInstanceOf(PrismaClientKnownRequestError);
      });
    });

    it("should return user found", async () => {
      const userInfo = await new UserService().findUserById(user.id);

      expect(userInfo).toMatchObject({ id: user.id });
    });
  });
});

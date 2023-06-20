import prisma from "@main/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import UserFactory from "@resources/user/user.factory";
import UserService from "@resources/user/user.service";

describe("@resources/user/user.service", () => {
  describe("UserService findUserAndDelete", () => {
    it("should throw error when no user found", async () => {
      const randomId = 0;

      await new UserService().findUserAndDelete(randomId).catch((error) => {
        expect(error).toBeInstanceOf(PrismaClientKnownRequestError);
      });
    });

    it("should delete user", async () => {
      const user = await new UserFactory().create();

      const deletedUser = await new UserService().findUserAndDelete(user.id);

      expect(deletedUser).toMatchObject(user);
      expect(
        await prisma.user.findFirst({ where: { id: user.id } })
      ).toBeNull();
    });
  });
});

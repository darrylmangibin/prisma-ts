import { faker } from "@faker-js/faker";
import comparePassword from "../compare.password";
import hashPassword from "../hash.password";

describe("@utils/password", () => {
  describe("compare.password", () => {
    it("should return true when password is match", async () => {
      const password = faker.internet.password();

      const hashedPassword = await hashPassword(password);

      expect(await comparePassword(password, hashedPassword)).toBeTruthy();
    });

    it("should return false when password mismatch", async () => {
      const password = faker.internet.password();
      const wrongPassword = faker.internet.password();

      const hashedPassword = await hashPassword(password);

      expect(await comparePassword(wrongPassword, hashedPassword)).toBeFalsy();
    });
  });
});

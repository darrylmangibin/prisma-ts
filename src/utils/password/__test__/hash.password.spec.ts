import bcrypt from "bcrypt";

import hashPassword from "../hash.password";

describe("@utils/password", () => {
  describe("hash.password", () => {
    it("should hash the password", async () => {
      const password = "123456";
      const wrongPassword = "654321";

      const hashedPassword = await hashPassword(password);

      expect(typeof hashedPassword).toBe("string");
      expect(await bcrypt.compare(password, hashedPassword)).toBeTruthy();
      expect(await bcrypt.compare(wrongPassword, hashedPassword)).toBeFalsy();
    });
  });
});

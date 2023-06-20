import jwt from "jsonwebtoken";
import signToken from "../sign.token";

describe("@utils/token", () => {
  describe("sign.token", () => {
    it("should generate token", () => {
      const id = 1;

      const token = signToken({ id });

      expect(typeof token).toBe("string");
      expect(
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)
      ).toMatchObject({ id });
    });
  });
});

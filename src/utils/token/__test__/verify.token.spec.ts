import signToken from "../sign.token";
import verifyToken from "../verify.token";

describe("@utils/token", () => {
  describe("verify.token", () => {
    it("should decode the token", () => {
      const id = 1;

      const token = signToken({ id });

      expect(verifyToken(token)).toMatchObject({ id });
    });
  });
});

import ErrorException from "../error.exception";

describe("@utils/exceptions", () => {
  describe("error.exception", () => {
    it("should return message, statusCode and errorObject", () => {
      const message = "Server error";
      const statusCode = 501;
      const errorObject = {
        name: "This is required",
      };

      const error = new ErrorException(message, statusCode, errorObject);

      expect(error).toMatchObject({
        message,
        statusCode,
        errorObject,
      });
    });
  });
});

import { app } from "@main/server";
import supertest from "supertest";
import { HTTPError } from "superagent";

const endpoint = "/api/not-found";

const isResErrorHTTPError = (
  resError: boolean | HTTPError
): resError is HTTPError => typeof resError !== "boolean";

describe("@middleware", () => {
  describe("not-found.middleware", () => {
    it("should return 404 error response", async () => {
      const res = await supertest(app).get(endpoint);

      expect(res.status).toBe(404);

      if (isResErrorHTTPError(res.error)) {
        expect(res.body).toMatchObject({
          message: `Route ${res.error.method} ${res.error.path} does not exists`,
        });
      }
    });
  });
});

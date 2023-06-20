import { Prisma } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import UserService from "@resources/user/user.service";
import keysPagination from "@utils/pagination/keys.pagination";

describe("@resources/user/user.service", () => {
  describe("UserService findUsers", () => {
    const pageNumber = 1;
    const pageSize = 4;
    let usersBatchPayload: Prisma.BatchPayload;

    beforeEach(async () => {
      usersBatchPayload = await new UserFactory().createMany(6);
    });

    it("should return users paginated results", async () => {
      const results = await new UserService().findUsers(pageNumber, pageSize);

      expect(Object.keys(results)).toEqual(
        expect.arrayContaining(keysPagination)
      );
      expect(results.data.length).toEqual(pageSize);
      expect(results.totalCount).toEqual(usersBatchPayload.count);
    });
  });
});

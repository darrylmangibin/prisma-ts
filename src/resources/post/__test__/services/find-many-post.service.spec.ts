import { Prisma } from "@prisma/client";
import PostFactory from "@resources/post/post.factory";
import PostService from "@resources/post/post.service";
import keysPagination from "@utils/pagination/keys.pagination";

describe("@resources/post/post.service", () => {
  describe("PostService findMany", () => {
    let postsBatchPayload: Prisma.BatchPayload;

    beforeEach(async () => {
      postsBatchPayload = await new PostFactory().createMany(6);
    });

    it("should return post pagination results", async () => {
      const pageNumber = 1;
      const pageSize = 3;
      const query = {
        include: {
          user: true,
        },
      } satisfies Prisma.PostFindManyArgs;

      const results = await new PostService().findMany(
        pageNumber,
        pageSize,
        query
      );

      console.log(results);

      expect(Object.keys(results)).toEqual(
        expect.arrayContaining(keysPagination)
      );
      expect(results.data.length).toEqual(pageSize);
      expect(results.totalCount).toEqual(postsBatchPayload.count);
      expect(results.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: expect.objectContaining({
              id: expect.any(Number),
            }),
          }),
        ])
      );
    });
  });
});

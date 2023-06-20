import { faker } from "@faker-js/faker";
import prisma from "@main/client";
import { Post } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";

class PostFactory {
  public async create(postData?: Partial<Post>) {
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        userId: postData?.userId
          ? postData.userId
          : (
              await new UserFactory().create()
            ).id,
        ...postData,
      },
    });

    return post;
  }

  public async createMany(count: number = 1, postData?: Partial<Post>) {
    const dataArray: Omit<Post, "id">[] = [];

    for await (let _k of Array.from({ length: count })) {
      const data = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        userId: postData?.userId
          ? postData.userId
          : (await new UserFactory().create()).id,
        ...postData,
      } satisfies Partial<Post>;

      dataArray.push(data);
    }

    return await prisma.post.createMany({
      data: dataArray,
    });
  }
}

export default PostFactory;

import { faker } from "@faker-js/faker";
import prisma from "@main/client";
import { User } from "@prisma/client";

class UserFactory {
  public async create(userData?: Partial<User>) {
    const user = await prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: "123456",
        role: "user",
        ...userData,
      },
    });

    return user;
  }

  public async createMany(count: number = 1, userData?: Partial<User>) {
    const dataArray: Omit<User, "id">[] = [];

    for await (let _k of Array.from({ length: count })) {
      const data = {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        password: "123456",
        role: "user",
        ...userData,
      } satisfies Partial<User>;

      dataArray.push(data);
    }

    return await prisma.user.createMany({
      data: dataArray,
    });
  }
}

export default UserFactory;

import "reflect-metadata";
import prisma from "@main/client";
import "dotenv/config";
import { User } from "@prisma/client";
import UserFactory from "@resources/user/user.factory";
import signToken from "@utils/token/sign.token";

global.signIn = async (userData?: Partial<User>) => {
  const user = await new UserFactory().create(userData);

  const token = signToken({ id: user.id });

  return { user, token };
};

afterEach(async () => {
  const user = prisma.user.deleteMany();
  const post = prisma.post.deleteMany();

  await prisma.$transaction([user, post]);
});

afterAll(async () => {
  await prisma.$disconnect();
});

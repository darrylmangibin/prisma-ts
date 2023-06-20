import createUserMiddleware from "@middleware/create-user.middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(createUserMiddleware);

export default prisma;

import prisma from "@main/client";
import { Prisma, User } from "@prisma/client";
import ErrorException from "@utils/exceptions/error.exception";
import dataPagination from "@utils/pagination/data.pagination";

class UserService {
  public async findUsers(
    pageNumber: number,
    pageSize: number,
    query?: Prisma.UserFindManyArgs
  ) {
    try {
      const results = await dataPagination<User, Prisma.UserFindManyArgs>(
        "User",
        pageNumber,
        pageSize,
        query
      );

      return results;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(body: Omit<User, "id">) {
    try {
      const isUserExists = Boolean(
        await prisma.user.findFirst({
          where: {
            email: body.email,
          },
        })
      );

      if (isUserExists) {
        throw new ErrorException("Email already exists", 400);
      }

      const user = await prisma.user.create({
        data: body,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async findUserById(userId: number) {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async findUserAndUpdate(userId: number, body: Partial<User>) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: body,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async findUserAndDelete(userId: number) {
    try {
      const user = await prisma.user.delete({ where: { id: userId } });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

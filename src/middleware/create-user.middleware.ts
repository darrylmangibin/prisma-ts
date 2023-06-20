import { Prisma } from "@prisma/client";
import hashPassword from "@utils/password/hash.password";

const createUserMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model === "User") {
    if (params.action === "create") {
      params.args.data.password = await hashPassword(params.args.data.password);
    }
  }

  return next(params);
};

export default createUserMiddleware;

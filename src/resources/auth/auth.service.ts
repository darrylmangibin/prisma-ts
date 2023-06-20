import prisma from "@main/client";
import { User } from "@prisma/client";
import ErrorException from "@utils/exceptions/error.exception";
import comparePassword from "@utils/password/compare.password";

class AuthService {
  public async loginUser(body: Pick<User, "email" | "password">) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: body.email },
      });

      const isPasswordMatch = await comparePassword(
        body.password,
        user?.password
      );

      if (!user || !isPasswordMatch) {
        throw new ErrorException("Invalid credentials", 401);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;

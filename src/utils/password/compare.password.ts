import bcrypt from "bcrypt";

const comparePassword = async (
  plainTextPassword?: string,
  hashedPassword?: string
): Promise<boolean> => {
  try {
    if (!plainTextPassword || !hashedPassword) {
      return false;
    }

    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};

export default comparePassword;

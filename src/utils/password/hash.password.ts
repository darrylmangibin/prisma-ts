import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    throw error;
  }
};

export default hashPassword;

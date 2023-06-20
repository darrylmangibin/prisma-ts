import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyToken = (token: string): AppPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);

  return decoded as AppPayload;
};

export default verifyToken;

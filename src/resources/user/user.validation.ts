import { User } from "@prisma/client";
import Joi from "joi";

export const userUpdateValidation = Joi.object<User>({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  role: Joi.string().required().valid("admin", "user"),
});

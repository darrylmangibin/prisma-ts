import { User } from "@prisma/client";
import Joi from "joi";

export const authRegisterValidation = Joi.object<User>({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export const authLoginValidation = Joi.object<User>({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const authProfileUpdateValidation = Joi.object<User>({
  email: Joi.string().required().email(),
  name: Joi.string().required(),
});

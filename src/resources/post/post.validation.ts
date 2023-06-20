import { Post } from "@prisma/client";
import Joi from "joi";

export const postCreateOrUpdateValidation = Joi.object<Post>({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

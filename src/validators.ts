import { body, param } from "express-validator";

export const blogCreateValidators = [
  body("title").isString().notEmpty(),
  body("body").isString().notEmpty(),
  body("author").isString().notEmpty(),
  body("published").isBoolean(),
];

export const userCreateValidators = [
  body("username").isString().notEmpty(),
  body("email").isEmail(),
  body("age").optional().isInt({ min: 0 }),
];

export const idParamValidator = [param("id").isUUID(4)];

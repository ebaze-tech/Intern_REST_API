"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamValidator = exports.userCreateValidators = exports.blogCreateValidators = void 0;
const express_validator_1 = require("express-validator");
exports.blogCreateValidators = [
    (0, express_validator_1.body)("title").isString().notEmpty(),
    (0, express_validator_1.body)("body").isString().notEmpty(),
    (0, express_validator_1.body)("author").isString().notEmpty(),
    (0, express_validator_1.body)("published").isBoolean(),
];
exports.userCreateValidators = [
    (0, express_validator_1.body)("username").isString().notEmpty(),
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("age").optional().isInt({ min: 0 }),
];
exports.idParamValidator = [(0, express_validator_1.param)("id").isUUID(4)];

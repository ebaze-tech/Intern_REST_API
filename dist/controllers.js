"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogs = exports.getAllUsers = void 0;
const store_1 = require("./store");
const getAllUsers = () => Array.from(store_1.users.values());
exports.getAllUsers = getAllUsers;
const getAllBlogs = () => Array.from(store_1.blogs.values());
exports.getAllBlogs = getAllBlogs;

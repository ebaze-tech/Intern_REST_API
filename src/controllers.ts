import { Blog, User } from "./models";
import { blogs, users } from "./store";

export const getAllUsers = (): User[] => Array.from(users.values());
export const getAllBlogs = (): Blog[] => Array.from(blogs.values());

import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { users } from "../store";
import { userCreateValidators, idParamValidator } from "../validators";
import { handleValidation } from "../middleware/handleValidation";
import { User } from "../models";
import { getAllUsers } from "../controllers";

export const router = Router();

// create user
router.post(
  "/",
  userCreateValidators,
  handleValidation,
  (req: Request, res: Response) => {
    const { username, email, age } = req.body as Partial<User>;
    const id = uuid();
    const user: User = { id, username: username!, email: email!, age };
    users.set(id, user);
    res.status(201).json({ message: "User created", user });
  }
);

// list users
router.get("/", (req: Request, res: Response) => {
  res.json({ users: getAllUsers() });
});

// get user
router.get(
  "/:id",
  idParamValidator,
  handleValidation,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.get(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  }
);

// delete user
router.delete(
  "/:id",
  idParamValidator,
  handleValidation,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = users.delete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  }
);

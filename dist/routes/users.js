"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const store_1 = require("../store");
const validators_1 = require("../validators");
const handleValidation_1 = require("../middleware/handleValidation");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// create user
exports.router.post("/", validators_1.userCreateValidators, handleValidation_1.handleValidation, (req, res) => {
    const { username, email, age } = req.body;
    const id = (0, uuid_1.v4)();
    const user = { id, username: username, email: email, age };
    store_1.users.set(id, user);
    res.status(201).json({ message: "User created", user });
});
// list users
exports.router.get("/", (req, res) => {
    res.json({ users: (0, controllers_1.getAllUsers)() });
});
// get user
exports.router.get("/:id", validators_1.idParamValidator, handleValidation_1.handleValidation, (req, res) => {
    const { id } = req.params;
    const user = store_1.users.get(id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ user });
});
// delete user
exports.router.delete("/:id", validators_1.idParamValidator, handleValidation_1.handleValidation, (req, res) => {
    const { id } = req.params;
    const deleted = store_1.users.delete(id);
    if (!deleted)
        return res.status(404).json({ message: "User not found" });
    res.status(204).send();
});

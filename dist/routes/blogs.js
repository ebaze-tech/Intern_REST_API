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
// create blog
exports.router.post("/", validators_1.blogCreateValidators, handleValidation_1.handleValidation, (req, res) => {
    const { title, body: content, author, published, } = req.body;
    const id = (0, uuid_1.v4)();
    const blog = {
        id,
        title: title,
        body: content,
        author: author,
        published: Boolean(published),
    };
    store_1.blogs.set(id, blog);
    res.status(201).json({ message: "Blog created", blog });
});
// list blogs
exports.router.get("/", (req, res) => {
    res.json({ blogs: (0, controllers_1.getAllBlogs)() });
});
// get blog
exports.router.get("/:id", validators_1.idParamValidator, handleValidation_1.handleValidation, (req, res) => {
    const { id } = req.params;
    const blog = store_1.blogs.get(id);
    if (!blog)
        return res.status(404).json({ message: "Blog not found" });
    res.json({ blog });
});
// update blog
exports.router.put("/:id", validators_1.idParamValidator, validators_1.blogCreateValidators, handleValidation_1.handleValidation, (req, res) => {
    const { id } = req.params;
    const existing = store_1.blogs.get(id);
    if (!existing)
        return res.status(404).json({ message: "Blog not found" });
    const { title, body: content, author, published, } = req.body;
    const updated = {
        ...existing,
        title: title ?? existing.title,
        body: content ?? existing.body,
        author: author ?? existing.author,
        published: published ?? existing.published,
    };
    store_1.blogs.set(id, updated);
    res.json({ message: "Blog updated", blog: updated });
});
// delete blog
exports.router.delete("/:id", validators_1.idParamValidator, handleValidation_1.handleValidation, (req, res) => {
    const { id } = req.params;
    const deleted = store_1.blogs.delete(id);
    if (!deleted)
        return res.status(404).json({ message: "Blog not found" });
    res.status(204).send();
});

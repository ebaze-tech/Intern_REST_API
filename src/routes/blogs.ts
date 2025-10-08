import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { blogs } from "../store";
import { blogCreateValidators, idParamValidator } from "../validators";
import { handleValidation } from "../middleware/handleValidation";
import { Blog } from "../models";
import { getAllBlogs } from "../controllers";

export const router = Router();

// create blog
router.post(
  "/",
  blogCreateValidators,
  handleValidation,
  (req: Request, res: Response) => {
    const {
      title,
      body: content,
      author,
      published,
    } = req.body as Partial<Blog>;
    const id = uuid();
    const blog: Blog = {
      id,
      title: title!,
      body: content!,
      author: author!,
      published: Boolean(published),
    };
    blogs.set(id, blog);
    res.status(201).json({ message: "Blog created", blog });
  }
);

// list blogs
router.get("/", (req: Request, res: Response) => {
  res.json({ blogs: getAllBlogs() });
});

// get blog
router.get(
  "/:id",
  idParamValidator,
  handleValidation,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = blogs.get(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ blog });
  }
);

// update blog
router.put(
  "/:id",
  idParamValidator,
  blogCreateValidators,
  handleValidation,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const existing = blogs.get(id);
    if (!existing) return res.status(404).json({ message: "Blog not found" });
    const {
      title,
      body: content,
      author,
      published,
    } = req.body as Partial<Blog>;
    const updated: Blog = {
      ...existing,
      title: title ?? existing.title,
      body: content ?? existing.body,
      author: author ?? existing.author,
      published: published ?? existing.published,
    };
    blogs.set(id, updated);
    res.json({ message: "Blog updated", blog: updated });
  }
);

// delete blog
router.delete(
  "/:id",
  idParamValidator,
  handleValidation,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = blogs.delete(id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.status(204).send();
  }
);

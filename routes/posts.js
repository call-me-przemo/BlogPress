import { Router } from "express";
import { Post } from "../db/models/post.js";
import createHttpError from "http-errors";

export const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.render("posts", {
      posts,
      title: "Posts",
    });
  } catch (err) {
    return next(createHttpError(500));
  }
});

router.get("/:id", async (req, res, next) => {
  // TODO: add post detail logic
  res.send(req.params.id);
});

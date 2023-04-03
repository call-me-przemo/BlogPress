import { Router } from "express";
import { Post } from "../db/models/post.js";
import { Comment } from "../db/models/comment.js";
import { User } from "../db/models/user.js";
import createHttpError from "http-errors";

export const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.render("posts/dashboard", {
      posts,
      title: "Posts",
    });
  } catch (err) {
    return next(createHttpError(500));
  }
});

router.get("/create", async (req, res, next) => {
  res.send("create post page");
});

router.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return next(createHttpError(400));
  }

  let post;
  try {
    post = await Post.findByPk(id, {
      include: { all: true, nested: true },
      order: [[Comment, "createdAt", "DESC"]],
      subQuery: false,
    });

    if (!post) {
      return next(createHttpError(404));
    }
  } catch (err) {
    return next(createHttpError(500));
  }

  res.render("posts/details", {
    title: post.title,
    post,
  });
});
